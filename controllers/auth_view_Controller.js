

export const render_login = (req,res) =>{
    res.render ("log",{layout: "layout/main",title:"Login"},)
}

export const render_register = (req,res) =>{
    res.render ("reg",{layout: "layout/main",title:"Register"},)
}


export const render_dashboard = (req,res) =>{
    res.render ("dashboard",{layout: "layout/main",title:"dashboard"},)
}

export const render_mypost = (req,res) =>{
    res.render ("myPost",{layout: "layout/main",title:"My Post"},)
}

export const render_createPost = (req,res) =>{
    res.render ("createPost",{layout: "layout/main",title:"Create Post"},)
}

export const render_editPost = (req,res) =>{
    res.render ("editPost",{layout: "layout/main",title:"EditPost"},)
}
