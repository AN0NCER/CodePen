import { LTransition } from "./mod_transition.js";

export let $RULES;

(async () => {
    try {
        const data = await import(`/tunime-loading/script.js`);
        $RULES = data.default;
        console.log(`[watch] - Custom RULES uploaded`);
        console.log($RULES);
    } catch { }

    setTimeout(() => {
        LTransition.Loaded(() => {
            console.log(`complete load`);
        })
    }, 2000);

    setTimeout(() => {
        LTransition.Progress.NewStep();
    }, 1000);
})();