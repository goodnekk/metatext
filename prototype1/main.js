/* Models */
//This contains the text, and the way they link to the next paragraph
//
// ----
// OK I realised this is not a rhizome though, which should already be clear
// by the fact that we kept using the word 'branching' yesterday, which
// makes it totally not a rhizome. It is in fact a tree structure with some branches
// every now and then, very much how git works (meta-lol).
//
// For this to be a rhizome, I think there should be not next id already set,
// and upon page loading, you would see all the item of the array laying sort of
// randomly around the page. Also, I was thining a grid-like layout would fit, but
// it's once again non rhizomatic, as it is not a flat-surface (in D&G slang),
// rather a striped / streaked surface (cfr a gridded surface).
//
// So I think the way a rhizomatic text / document should work is:
// upon loading you get all your items dispersed all over the page, then
// you start clicking on one, then you pick another one an make a connection
// and so forth. It is more of a continous discovery for the user both
// reading *and* working on this array, than the user deciding upfront the order
// and then another user (or the same one) going through it and make some choices
// when being asked. I imagine this probably more as a cut-up style of working
// together with a mind-mapp / connection / etc...
//
// ☺︎
//
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
