/* Models */
//This contains the text, and the way they link to the next paragraph
var Rhizome = [
    {
        id: 0,
        content: "Text normally flows in a linear fashion.",
        next: [1]
    },
    {
        id: 1,
        content: "One paragraph follows the next, and so forth until the end",
        next: [2]
    },
    {
        id: 2,
        content: "However, text could also fork",
        next: [3,4]
    },
    {
        id: 3,
        content: "Allowing the reader to read in a non-linear way",
        next: [5]
    },
    {
        id: 4,
        content: "Allowing the writer to write in a non-linear way",
        next: [6]
    },
    {
        id: 5,
        content: "This allows the reader to choose their own path through the text.",
        next: [7]
    },
    {
        id: 6,
        content: "This gives the writer the freedom to create different paths through the text.",
        next: [7]
    },
    {
        id: 7,
        content: "And at some point joining back.",
        next: [0]
    }
];

//this contains the history: the path the user takes
var PathTrace = [0];

//return the current view
function ViewModel(){
    return PathTrace.map((e)=>{
        return Rhizome[e];
    });
}

function NextParagraphs(){
    //fucked-up function to look up next possible steps
    return Rhizome[PathTrace[PathTrace.length-1]].next.map((e)=>{
        return Rhizome[e];
    });
}

/* Controllers */

function Step(e){
    PathTrace.push(e);
}

/* Views */
const Paragraph = {
    view: (vnode) => {
        const e = vnode.attrs;
        return [
            m(".paragraph", e.content)
        ];
    }
};

const PossibleParagraph = {
    view: (vnode) => {
        return m(".possibleparagraph", {
            onclick: ()=>{
                Step(vnode.attrs.id);
            }
        }, vnode.attrs.content);
    }
};

const Document = {
    view: () => {
        return m(".document", [
            ViewModel().map((e)=>{
                return m(Paragraph, e);
            }),
            NextParagraphs().map((e)=>{
                return m(PossibleParagraph, e);
            })
        ]);
    }
};

m.mount(document.body, Document);
