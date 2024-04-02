<?php
// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Block roadmap is defined here.
 *
 * @package     block_roadmap
 * @copyright   2024 Vincent Nys <vincent.nys@ap.be>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

// may need some of these...
// require_once('../../config.php');
// require_once($CFG->dirroot . '/course/modlib.php');
// defined('MOODLE_INTERNAL') || die();
// require_once($CFG->dirroot . '/course/lib.php');

class block_roadmap extends block_base
{

    /**
     * Initializes class member variables.
     */
    public function init()
    {
        // Needed by Moodle to differentiate between blocks.
        $this->title = get_string('pluginname', 'block_roadmap');
    }

    /** Where to show the block. */
    public function default_region()
    {
        return 'jumbotron';
    }

    /**
     * Returns the block contents.
     *
     * @return stdClass The block contents.
     */
    public function get_content()
    {
        global $PAGE;
        global $DB;
        global $COURSE;
        global $USER;

        $serializations = $DB->get_records('clusters', array("courseid" => $COURSE->id));
        // having trouble with JOIN via DB API, so taking the long route
        $sections = $DB->get_records('course_sections', array("course" => $COURSE->id));
        $section_ids = array_map(function ($section) {
            return $section->id;
        }, $sections);
        $course_nodes = $DB->get_records_list('nodes', 'course_sections_id', $section_ids);
        $namespaced_nodes = array_map(function ($node) use ($serializations) {
            $matching_clusters = array_filter($serializations, function ($cluster) use ($node) {
                return $cluster->id == $node->clusters_id;
            });
            $cluster = array_values($matching_clusters)[0];
            $node_copy = clone $node;
            $node_copy->cluster_name = $cluster->name;
            return $node_copy;
        }, $course_nodes);
        $user_completions = $DB->get_records('course_modules_completion', array('userid' => $USER->id, 'completionstate' => 1));
        $completed_nodes = array_filter($namespaced_nodes, function ($node) use ($user_completions) {
            return in_array($node->manual_completion_assignment_id, array_map(function ($completion) {
                return $completion->coursemoduleid;
            }, $user_completions));
        });
        $course_node_ids = array_map(function ($node) {
            return $node->id;
        }, $course_nodes);
        $prerequisite_records = $DB->get_records_list(
            'node_prerequisites',
            'dependent',
            $course_node_ids
        );
        $prerequisites = array_map(function ($node) use ($prerequisite_records, $namespaced_nodes) {
            $dependency_block = new stdClass();
            $dependency_block->slug = $node->slug;
            $dependency_block->cluster = $node->cluster_name;
            $any_records = array_filter($prerequisite_records, function ($record) use ($node) {
                return $record->dependent == $node->id && $record->edge_type == 'any';
            });
            $all_records = array_filter($prerequisite_records, function ($record) use ($node) {
                return $record->dependent == $node->id && $record->edge_type == 'all';
            });
            $dependency_block->any = array_values(array_map(function ($any_record) use ($namespaced_nodes) {
                $matching_nodes = array_filter($namespaced_nodes, function ($node) use ($any_record) {
                    return $any_record->dependency == $node->id;
                });
                return array_values($matching_nodes)[0];
            }, $any_records));
            $dependency_block->all = array_values(array_map(function ($all_record) use ($namespaced_nodes) {
                $matching_nodes = array_filter($namespaced_nodes, function ($node) use ($all_record) {
                    return $all_record->dependency == $node->id;
                });
                return array_values($matching_nodes)[0];
            }, $all_records));
            return $dependency_block;
        }, $namespaced_nodes);
        $PAGE->requires->js_call_amd(
            'block_roadmap/roadmap',
            'jsInit',
            [
                $serializations,
                array_values($completed_nodes),
                array_values($prerequisites),
            ]
        );
        $this->content = new stdClass();
        $this->content->items = array();
        $this->content->icons = array();
        $this->content->footer = '';
        $text = "<div id=\"roadmap\" />";
        $this->content->text = $text;
        return $this->content;
    }

    /**
     * Defines configuration data.
     *
     * The function is called immediately after init().
     */
    public function specialization()
    {

        // Load user defined title and make sure it's never empty.
        if (empty($this->config->title)) {
            $this->title = get_string('pluginname', 'block_roadmap');
        } else {
            $this->title = $this->config->title;
        }
    }

    /**
     * Sets the applicable formats for the block.
     *
     * @return string[] Array of pages and permissions.
     */
    public function applicable_formats()
    {
        return array(
            'all' => false,
            'course-view' => true,
            'course-view-social' => false
        );
    }
}
