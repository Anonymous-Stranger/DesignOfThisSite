
if (typeof(DOTSGlobal) === 'undefined') DOTSGlobal = {};

DOTSGlobal.to_run_on_load = [];

DOTSGlobal.runOnLoad = function(f){
    DOTSGlobal.to_run_on_load.push(f);
}

window.addEventListener('WebComponentsReady', function(){
    for (var i = 0; i != DOTSGlobal.to_run_on_load.length; ++i) {
        DOTSGlobal.to_run_on_load[i]();
    }
});


DOTSGlobal.bringBackTransitions = function() {
    no_transitions_class = 'no-transitions-while-pageload';

    var trn_less = document.querySelectorAll("."+no_transitions_class);

    for (var i = 0; i != trn_less.length; ++i) {
        trn_less[i].classList.remove(no_transitions_class);
    }
}


DOTSGlobal.runOnLoad(DOTSGlobal.bringBackTransitions);
