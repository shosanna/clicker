import * as _ from "lodash";
import {action, computed, observable} from "mobx";
import {observer} from "mobx-react";

const DEFAULT_GROWTH = 1.07;

export class Generator {
    public name: GeneratorType;
    public initialCost: number;
    public production: number;
    public growth: number;
    @observable public owned: number;

    constructor(name: GeneratorType, cost: number, production: number, growth: number = DEFAULT_GROWTH) {
        this.name = name;
        this.initialCost = cost;
        this.production = production;
        this.growth = growth;
        this.owned = 0;
    }

    @computed get perSecond() {
        return this.production * this.owned;
    }

    @computed get cost() {
        return this.initialCost * Math.pow(this.growth, this.owned);
    }

    calculateCost(amount: number) {
        let price = 0;

        for (var i = 0; i < amount; i++) {
            price += this.initialCost * Math.pow(this.growth, this.owned + i);
        }
        return price;
    }
}

export enum GeneratorType {
    BLUEBERRY_TREE = "blueberry tree",
}

const INITIAL_BLUEBERRIES_PER_SECOND = 0;

export class State {
    @observable public blueberries: number = 10;

    public generators: Generator[] = [
        new Generator(GeneratorType.BLUEBERRY_TREE, 10, 1),
    ];

    @computed get blueberriesPerSecond() {
        return INITIAL_BLUEBERRIES_PER_SECOND + _.sum(this.generators.map(gen => gen.perSecond));
    }

    @computed get blueberryTrees() {
        return _.sum(this.generators.map(function(gen) {
          if (gen.name == GeneratorType.BLUEBERRY_TREE) {
            return gen.owned
          }
        }));
    }

    @action buy(gen: Generator, amount: number = 1) {
        const cost = gen.calculateCost(amount);

        if (this.blueberries >= cost) {
            this.blueberries -= cost;
            gen.owned += amount;
        }
    }
}
