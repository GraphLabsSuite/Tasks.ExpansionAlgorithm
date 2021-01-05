import React from 'react';
import './App.css';

import {
        GraphVisualizer,
        graphModel,
        Template,
        Toolbar,
        ToolButtonList, graph
} from "graphlabs.core.template";
import {IGraph, IVertex, IEdge, GraphGenerator, Graph, Vertex, Edge} from "graphlabs.core.graphs";
import { ChangeEvent } from "react";
import {Matrix, MatrixCell} from "graphlabs.core.lib";


class App extends Template {

    //graph: IGraph<IVertex, IEdge> = GraphGenerator.generate(5);
    //graph: Graph<IVertex, IEdge> = store.getState().graph

    data = [
        {
            "type": "graph",
            "value": {
                "vertices": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9"
                ],
                "edges": [
                    {
                        "source": "1",
                        "target": "2"
                    },
                    {
                        "source": "2",
                        "target": "3"
                    },
                  {
                        "source": "3",
                        "target": "4"
                    },
                    {
                        "source": "4",
                        "target": "5"
                    },
                    {
                        "source": "4",
                        "target": "1"
                    },
                  {
                        "source": "5",
                        "target": "2"
                    },
                    {
                        "source": "1",
                        "target": "6"
                    },
                    {
                        "source": "6",
                        "target": "7"
                    },
                    {
                        "source": "3",
                        "target": "7"
                    },
                    {
                        "source": "7",
                        "target": "8"
                    },
                    {
                        "source": "5",
                        "target": "9"
                    },
                    {
                        "source": "3",
                        "target": "9"
                    },
                    {
                        "source": "7",
                        "target": "8"
                    },
                    {
                        "source": "8",
                        "target": "9"
                    },

                ]
            }
        }
    ]

    graph: IGraph<IVertex, IEdge> = this.graphMy(this.data[0].value);
    private studentAnswer?: string;
    private studentAns?: string;
    private studentRoute?: string;

    public graphMy(data:any): IGraph<IVertex, IEdge> {
        const graph: IGraph<IVertex, IEdge> = new Graph() as unknown as IGraph<IVertex, IEdge>;
        if (data) {
            let vertices = data.vertices;
            let edges = data.edges;
            vertices.forEach((v: any) => {
                graph.addVertex(new Vertex(v));
            });
            edges.forEach((e: any) => {
                if (e.name) {
                    graph.addEdge(new Edge(graph.getVertex(e.source)[0], graph.getVertex(e.target)[0], e.name[0]));
                } else {
                    graph.addEdge(new Edge(graph.getVertex(e.source)[0], graph.getVertex(e.target)[0]));
                }
            });

        }
        return graph;
    }

    matrix: number[][] = [];


    constructor(props: {}) {
               super(props);
               this.calculate = this.calculate.bind(this);
               this.getArea = this.getArea.bind(this);
               this.checkAnswer = this.checkAnswer.bind(this);
               this.checkRoute = this.checkRoute.bind(this);
               this.handler = this.handler.bind(this);
             //  this.checkConnected = this.checkConnected.bind(this);
       }


    private checkAnswer(value: ChangeEvent<HTMLInputElement>) {
        this.studentAnswer = value.target.value ;

    }
private checkRoute(value: ChangeEvent<HTMLInputElement>){
    this.studentRoute = value.target.value;
}
/*private checkConnected(value: ChangeEvent<HTMLInputElement>){
    this.studentAns = value.target.value ;
}*/



       public task() {
           return () => (
               <div>
            <span>
                Введите кратчайшее расстояние между 1 и {this.graph.vertices.length} вершинами при помощи волнового алгоритма.<br/> <br/>
                Также через запятую выпишите номера вершин, через которые проходит путь.
                <br/>
                <br/>
                </span>
                   <p><b>Введите длину пути: </b>
                       <input type="text" name={"answer"} size={2} value={this.studentAnswer}
                              onChange={this.checkAnswer}/></p>
                   <p><b>Введите вершины: </b>
                       <input type="text" name={"ans"} size={8} value={this.studentRoute}
                              onChange={this.checkRoute}/></p>
                   <p><b>Введите атрибуты волны для каждой вершины: </b>
                       <Matrix
                           rows={1}
                           columns={this.graph.vertices.length}
                           readonly={false}
                           handler={this.handler}
                           matrixFilling={true}
                       /></p>

               </div>);
       }

    handler(values: number[][]) {
        this.matrix = values;
    }

        protected getArea(): React.SFC<{}> {
        //
            //if (this.isConnected(this.graph)){
                this.waveAttributes(this.graph);
            //}
              return () => <GraphVisualizer
                   graph={this.graph}
                   //graph={graphModel}
                   adapterType={'readable'}
                   namedEdges={true}
                   incidentEdges={true}
                />;
        }

        public calculate() {
        const  dist = this.waveAttributes(this.graph)[0].length - 1 + '';
        const answer = this.studentAnswer;
       // const answerConnected = this.studentAns;
        const answerRoute = this.studentRoute;
        let routeAtr = this.waveAttributes(this.graph)[0];
        let answerVertices: string [] = [];
        let routes: boolean [] = [];
        if (answerRoute){
        let myVertices = answerRoute.split(',');
        for (let h = 0; h < myVertices.length; h++){
            answerVertices.push(myVertices[h]);
        }
        }
       for (let k = 1; k < this.waveAttributes(this.graph).length; k++){
          //for(let l = 0; l < this.waveAttributes(this.graph)[k].length; l++){
               console.log(this.waveAttributes(this.graph)[k][2]);
          // }
       }
            let countOfCorrectWave: number = 0; //
            for (let d = 0; d < this.graph.vertices.length; d++){
                if (this.graph.vertices[d].wave === this.matrix[0][d] + ''){
                    countOfCorrectWave += 1;
                }
            } // возвращает количество правльно введенных атрибутов волны для вершин

        for (let m = 0; m < answerVertices.length; m ++){
            for (let j = 0; j < routeAtr.length; j++){
                if(answerVertices[m] === routeAtr[j]){
                    routes.push(true)
                } else {
                    for (let n = 1 ;n < this.waveAttributes(this.graph).length; n++) {
                        if (+this.waveAttributes(this.graph)[n][2] === +answerVertices[m]
                            && this.graph.vertices[+this.waveAttributes(this.graph)[n][2] - 1].wave === this.graph.vertices[+answerVertices[m]-1].wave
                        && this.graph.vertices[+answerVertices[m]-1].isAdjacent(this.graph, this.graph.vertices[+this.waveAttributes(this.graph)[n][0] - 1]))
                        {  j = routeAtr.length - 1;
                            routes.push(true);
                        }
                    }
                }
            }
        }

        let finalRoute: boolean;
        if (routes.length === routeAtr.length){
            finalRoute = true;
        } else finalRoute = false;
        let res = 0;
        if (( (answer===dist) &&  (finalRoute === true) && (countOfCorrectWave === this.graph.vertices.length))
            || ( (typeof (answer) === "undefined" ) &&( typeof (answerRoute) === 'undefined'))){
            res = 0;
        }else if (( answer!==dist) && (finalRoute === true) && (countOfCorrectWave === this.graph.vertices.length)){
            res = 20;
        }else if(( answer===dist) && ((answerRoute === '') || (finalRoute === false))
            && (countOfCorrectWave === this.graph.vertices.length)) {
            res = 40;
            //}else if(!this.isConnected(this.graph)&& (ans==='1') && answer!==''){
            // res = 100;
            //  }
        } else {
            res = 50;
        }
            return Promise.resolve({success: res === 0, fee: res});
        }

        protected getTaskToolbar() {
                Toolbar.prototype.getButtonList = () => {
                        ToolButtonList.prototype.help = () =>
                            `В данном задании Вы должны определить минимальное расстояние между вершинами графа`;
                        ToolButtonList.prototype.beforeComplete = this.calculate;
                        return ToolButtonList;
                }
                return Toolbar;
        }

        public waveAttributes(graph: IGraph<IVertex, IEdge>) {
                let arrWaveAtr: string[] = [];
                graph.vertices[0].wave = '0';
                arrWaveAtr.push(graph.vertices[0].wave);
                for(let h = 1; h < graph.vertices.length; h++){
                    arrWaveAtr.push('')
                }
                let waveCurr:number = +(graph.vertices[0].wave);
                let arr: IVertex[] = [];
                function numOfVertex(graph: IGraph<IVertex, IEdge>, vertex: IVertex): number {
                    let num = 0;
                    for(let i = 0; i < graph.vertices.length; i++){
                        if(vertex.name === graph.vertices[i].name){
                            num = i;
                     }
                    }
                    return num;
                 }
                function waveAssign(d:IVertex) {
                    arr = d.arrOfAdjacentVertices(graph);
                    for (let i = 0; i < arr.length; i++) {
                        if (arrWaveAtr[numOfVertex(graph, arr[i])] === '') {
                            arr[i].wave = waveCurr + 1 + '';
                            arrWaveAtr[numOfVertex(graph, arr[i])] = waveCurr + 1 + '';

                        }
                    }
                }
                while(arrWaveAtr[graph.vertices.length - 1] === '') {
                    for (let l = 0; l < graph.vertices.length; l++) {
                        if (arrWaveAtr[l] === waveCurr + '') {
                            waveAssign(graph.vertices[l]);
                        }
                    }
                    waveCurr = waveCurr + 1;
                }

                let arrForRoute: string[] = [];
                let allRoutes = [];
                let myArray: IVertex[] = [];
                let addArray = [];
                if (arrWaveAtr[graph.vertices.length - 1] !== ''){
                    arrForRoute.push(graph.vertices.length + '');
                    let currentNode = graph.vertices.length - 1;
                    while (currentNode !== 0){
                        for (let p = 0; p < graph.vertices[currentNode].arrOfAdjacentVertices(graph).length; p++ ){
                           myArray = graph.vertices[currentNode].arrOfAdjacentVertices(graph);
                           for (let m = 0; m < myArray.length; m++){
                               if (arrWaveAtr[numOfVertex(graph, myArray[p])] === arrWaveAtr[numOfVertex(graph, myArray[m])]
                                  && numOfVertex(graph, myArray[m]) !== 0
                               && (+(arrWaveAtr[currentNode]) === +(arrWaveAtr[numOfVertex(graph, myArray[p])]) + 1)){
                                  let alternativeVertex = [currentNode + 1,arrWaveAtr[numOfVertex(graph, myArray[m])], numOfVertex(graph, myArray[m]) + 1];
                                   addArray.push(alternativeVertex)
                               }
                           }
                            if ( +(arrWaveAtr[currentNode]) === +(arrWaveAtr[numOfVertex(graph, myArray[p])]) + 1) {
                               currentNode = numOfVertex(graph, myArray[p]);
                               arrForRoute.push(numOfVertex(graph, myArray[p]) + 1 + '');
                            }
                        }
                    }
                }
                allRoutes.push(arrForRoute);

            for (let y = 0 ; y < addArray.length; y++){
                allRoutes.push((addArray[y]))
            }

            return allRoutes;
        }


    public isConnected(graph: IGraph<IVertex, IEdge>): boolean{
        let visited: boolean[] = [];
        for(let p = 0; p < graph.vertices.length; p++){
            visited.push(false)
        }
        let arr: IVertex[] = [];
        let visitedVertices = 0;
        function numOfVertex(graph: IGraph<IVertex, IEdge>, vertex: IVertex): number {
            let num = 0;
            for(let i = 0; i < graph.vertices.length; i++){
                if(vertex.name === graph.vertices[i].name){
                    num = i;
                }
            }
            return num;
        }
        function dfs(d: IVertex): number {
            visitedVertices = 1;
            visited[numOfVertex(graph, d)] = true;
            arr = d.arrOfAdjacentVertices(graph);
                for (let k = 0; k < arr.length; k++) {
                    if (!visited[numOfVertex(graph, arr[k])]) {
                        visitedVertices = visitedVertices + dfs(arr[k]);
                    }
                }

            return visitedVertices
        }
        return (dfs(graph.vertices[0]) === graph.vertices.length)
    }


}

export default App;
