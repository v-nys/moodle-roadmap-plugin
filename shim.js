// fragment of glue code
export const jsInit = (serializations) => {
    const node = document.getElementById('roadmap');
    if (node) {
        console.debug(serializations);
        Elm.Main.init({ node });
    }
};
