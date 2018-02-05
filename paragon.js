
//using subscription pattern to resolve the problem of multiple aynsc dependencies

class paragon{
    //requires the expression to be executed upon resolution and 
    constructor(func_p, num_p, cur_p = 0, q_p = []){
        this.exp = func_p;
        this.n = num_p;
        this.c = cur_p;
        this.q = q_p;
    }
    
    push(i,k){
        if(!q[i])
            c++;
        q[i]=k;
        if(c===n)
            return resolv();
        else
            return c;
    }
    //as the expression depends on the dependencies noted in q; the expression will take q as a container for the parameters
    resolv(){
        return exp(q);
    }
}
