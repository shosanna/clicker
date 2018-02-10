import * as React from "react";
import * as ReactDOM from "react-dom";
import { State, Generator, GeneratorType } from "./state";
import { observer, inject } from "mobx-react";
import DevTools from "mobx-react-devtools";

@observer
class BuyButtons extends React.Component<{ gen: Generator, state: State }, any> {
    render() {
        let { state, gen } = this.props;

        let buttons = [1].map(amount => {
            let cost = gen.calculateCost(amount);
            return <button disabled={state.blueberries < cost} onClick={() => state.buy(gen, amount)} key={amount}>
                Buy
            </button>;
        })
        return <span>{buttons}</span>;
    }
}

@inject("state")
@observer
class GeneratorView extends React.Component<{ gen: Generator, state?: State }, any> {
    render() {
        let { state, gen } = this.props;
        return (
            <div>
                <p>
                    {gen.name}: {gen.owned} ({gen.perSecond.toFixed(1)} per second, cost: {gen.cost.toFixed(0)})
                    <BuyButtons state={state} gen={gen}/>
                </p>
            </div>
        );
    }
}

const ShowNumber = (props: { num: number }) => <span>{props.num.toFixed(1)}</span>;

@inject("state")
@observer
export class Root extends React.Component<{ state?: State }, any> {
    render() {
        let { state } = this.props;
        return (
            <div className="container">
                <h1>Kuratko Clicker</h1>
                <DevTools/>

                {state.generators.map(gen => <GeneratorView key={gen.name} gen={gen}/>)}
                <p>Currently you have <ShowNumber num={state.blueberries}/> blueberries</p>
                <p>You are gaining {state.blueberriesPerSecond.toFixed(1)} blueberries per second.</p>
                {state.blueberryTrees >= 1 && showBlueberryTrees(state.blueberryTrees)}
            </div>
        );
    }
}

function showBlueberryTrees(blueberryTrees: number) {
  let trees = [];
  for (var i = 0; i < blueberryTrees; i++) {
    let style = { left: i * 50 }
    let tree = <img id="blueberry-tree" style={style} src="/images/blueberry_tree.png" alt="blueberry tree" />;
    trees.push(tree);
  }
  return (
    trees
  )
}

// export let Root = observer(["state"], (props: { state: State }) => );
