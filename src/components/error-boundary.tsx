import React from "react";

type FallBackRender = (props:{error:Error|null}) => React.ReactElement

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender:FallBackRender}>,any>{
    state = {error:null}

    //当子组件抛出异常，这里会接收到并且调用
    static getDerivedStateFormError(error:Error){
        return {error}
    }

    render(){
        const {error} = this.state
        const {fallbackRender,children} = this.props
        if(error){
            return fallbackRender({error})
        }
        return children
    }
}