let nnetga = require('./nnetga.js');

let agentNum = 20;
nnetga.add_pop(1, 0.7, 0.005, 0.3);
nnetga.add_agent(0, agentNum);
nnetga.add_net(0, 2, 1, 2, 1);

let test1 = [...Array(agentNum)].map(x => [0, 1]);
test1 = [test1];

let test2 = [...Array(agentNum)].map(x => [0, 0]);
test2 = [test2];

let test3 = [...Array(agentNum)].map(x => [1, 1]);
test3 = [test3];

let test4 = [...Array(agentNum)].map(x => [1, 0]);
test4 = [test4];

let Score, hiScore, Average, WinnerAgent, a, b, c, d;

for (let i = 0; i < 600; i++) {
    Score = Array(agentNum).fill(0);
    a = nnetga.update(test1);
    b = nnetga.update(test2);
    c = nnetga.update(test3);
    d = nnetga.update(test4);


    for (let iAgent = 0; iAgent < agentNum; iAgent++) {
        let bonus = 0;
        Score[iAgent] += (1 - (1 - a[0][iAgent][0])) * 100;
        Score[iAgent] += (1 - (b[0][iAgent][0])) * 100;
        Score[iAgent] += (1 - (c[0][iAgent][0])) * 100;
        Score[iAgent] += (1 - (1 - d[0][iAgent][0])) * 100;
        if (Score[iAgent] > 320)
            bonus += 10;
        if (Score[iAgent] > 370)
            bonus += 30;
        if (Score[iAgent] > 390)
            bonus += 60;
        if (Score[iAgent] > 395)
            bonus += 100;
    }

    hiScore = Math.max(...Score);
    Average = Score.reduce((a, b) => a + b, 0) / agentNum;
    WinnerAgent = Score.indexOf(hiScore);

    nnetga.next_gen(0, Score);
    console.log({ Average });

}
console.log("Agent:", WinnerAgent, " winner with:", hiScore);
console.log("Average score:", Average);
// nnetga.info_net(0, WinnerAgent, 1);
console.log(a[0][WinnerAgent][0], "|", b[0][WinnerAgent][0], "|", c[0][WinnerAgent][0], "|", d[0][WinnerAgent][0]);
console.log("----");