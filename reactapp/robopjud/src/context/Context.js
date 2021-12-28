// import { createContext } from "react";

// const UserContext = createContext({
//     name : null,
//     role:null,
//     token : null,
// });

// export default UserContext;

import React,{createContext} from "react";

const Context = createContext({
    name:null,
    token:null,
    role:null
});

export default Context;