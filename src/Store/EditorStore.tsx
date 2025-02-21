import {create} from "zustand";

export interface Sidebar {
    name:string,
    icon:any,
}

export interface EditorState{
    activeSideBarTabName:string,
    setActiveSideBarTabName:(name:string) => void
}

export const useEditorState = create<EditorState>((set)=>({
    activeSideBarTabName:"",
    setActiveSideBarTabName: (name) => set({activeSideBarTabName:name})
}))