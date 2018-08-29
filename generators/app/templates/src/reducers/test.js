let initState = {
    test:1
};

function index(state = initState, action) {
    switch (action.type){
        case 1:
            return 1;
        default : return state;
    }
};

export default index;