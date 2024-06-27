// fragment of glue code
export const jsInit = (course_nodes, serializations, completed_nodes, dependencies) => {
    console.log("All course nodes:");
    console.debug(course_nodes);
    console.log("Completed nodes (not yet handled by Elm):");
    console.debug(completed_nodes);
    console.log("Dependencies (not yet handled by Elm):");
    console.debug(dependencies);
    const node = document.getElementById('roadmap');
    if (node) {
        console.debug(serializations);
        Elm.Main.init({
            node,
            flags: {
                clusters: Object.values(serializations).map(({name, yaml}) => { return { cluster: name, yaml } }),
                completed: Object.values(completed_nodes),
                dependencies: Object.values(dependencies)
            }
        });
    }
};
