class Shield {

    constructor() {
        this.prt = async (action,data,subAction) => {
            try {
                let formData = new FormData()

                for(let param in data) {
                    formData.append(param,data[param])
                }

                for(let param in this.configuration.static) {
                    formData.append(param, this.configuration.static[param])
                }

                if(subAction) {
                    formData.append(this.configuration.field_action,subAction)
                } else {
                    formData.append(this.configuration.field_action,action)
                }

                let result = await fetch(this.configuration.remote,{method:'post',body:formData})
                let resultJSON = await result.json()
                return resultJSON
            } catch (error) {
                
            }
            
        }
    }

    //Public method
    load(configuration) {
        this.configuration = configuration
        if(configuration == undefined) {
            throw new Error('Configuration is null')
        }
        if(Array.isArray(configuration.actions)) {
            configuration.actions.forEach(action => {
                if(typeof action == 'string') {
                    this[action] = (data) => this.prt(action,data, undefined)
                } else {
                    this[action.name] = {}
                    action.actions.forEach(subAction => {
                        this[action.name][subAction] = (data) => this.prt(action.name,data,subAction)
                    })
                }
            })
        } else {
            throw new Error("No action")
        }
    }

}

const shield = new Shield()
export default shield