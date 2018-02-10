//using subscriber pattern to resolve the problem of multiple aynsc dependencies

class paragon{
    //requires the expression to be executed upon resolution and 
    constructor(func_p, num_p, cur_p = 0, q_p = [], callback = null){
        this.exp = func_p;
        this.n = num_p;
        this.c = cur_p;
        this.q = q_p;
        this.res = callback;
        this.rej;
        this.r = false; //whether wait is finished
        if(this.c === this.n){
            resolv();
        }
    }
    
    push(i,k){
        if(!this.q[i])
            this.c++;
        this.q[i]=k;
        if(this.c===this.n)
            return this.resolv();
        else
            return this.c;
    }
    //used to attach resolve and reject calls. can also be used to bind callbacks
    promise(res,rej=null){
        this.res = res;
        this.rej = rej;//TODO: Implement reject for callback& promise wrappers so this actually makes sense
    }
    
    //as the expression depends on the dependencies noted in q; the expression will take q as a container for the parameters
    resolv(){
        this.val = this.exp(this.q);
        this.r = true;
        if(this.res){//implementation of callback support
            return this.res(this.val);
        }
        else{
            return this.val;
        }
    }
}

//an attempt at wrapping the base in a promise
function propara(p){
    return new Promise((res,rej)=>{
        p.promise(res,rej);
    });
}


//having just the object itself without some other abstraction and support is probably a really dumb idea
//so here is some wrappers for your async dependency needs

function paraval(val, paragon, i){
    return paragon.push(i,val);
}//value

function parathread(func, paragon, i, p=[]){
    return paragon.push(i,func.apply(this,p));
}//function and thread

function paracal(func, paragon, i, p=[]){
    c = (result)=>{
        return paragon.push(i,result);
    }
    p.push(c);
    func.apply(this,p);
}//callback

function parapro(pro, paragon, i, err = (e)=>{console.log(e);}){
    pro.then((value){paragon.push(i,value);})
    .catch(err);
}//promise
