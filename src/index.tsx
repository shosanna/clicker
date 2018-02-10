import * as _ from "lodash";
import * as $ from "jquery";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { Root } from "./view";
import { Generator, State } from "./state";
import { Provider } from "mobx-react";

(window as any).$ = (window as any).jQuery = $;

let state = (window as any).state = new State();

function update(dt: number) {
    state.blueberries += state.blueberriesPerSecond * dt;
}

var lastFrame = performance.now();
var requestAnimationFrameId: number;
var FPS = 1; // It doesn't really matter what value we initialize FPS to.
var alpha = 0.1;

function stopGameLoop() {
    window.cancelAnimationFrame(requestAnimationFrameId);
}

function gameLoop(timestamp: number) {
    requestAnimationFrameId = window.requestAnimationFrame(gameLoop);

    if (timestamp < lastFrame + (1000 / 60)) {
        return;
    }

    var dt = (timestamp - lastFrame) / 1000;
    lastFrame = timestamp;
    FPS = FPS + (1 - alpha) * (1/dt - FPS);

    update(dt);
}

ReactDOM.render(
    <Provider state={state}>
        <Root/>
    </Provider>,
    document.getElementById("game-container"));

requestAnimationFrameId = window.requestAnimationFrame(gameLoop);
