// fragment of glue code
export const jsInit = (serializations) => {
    const node = document.getElementById('roadmap');
    if (node) {
        console.debug(serializations);
        Elm.Main.init({ node, flags: Object.values(serializations).map(({name, yaml}) => { return { cluster: name, yaml } }) });
    }
};
