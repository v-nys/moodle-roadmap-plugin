// fragment of glue code
export const jsInit = (serializations, completed_nodes, dependencies) => {
    console.log("Completed nodes (not yet handled by Elm):");
    console.debug(completed_nodes);
    console.log("Dependencies (not yet handled by Elm):");
    console.debug(dependencies);
    const node = document.getElementById('roadmap');
    if (node) {
        console.debug(serializations);
        Elm.Main.init({ node, flags: Object.values(serializations).map(({name, yaml}) => { return { cluster: name, yaml } }) });
    }
};
