class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3, tamanho: 1 }] },
            { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
            { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1, tamanho: 2 }] },
            { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
            { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1, tamanho: 3 }] }
        ];

        this.animaisValidos = {
            "LEAO": { tamanho: 3, bioma: ["savana"], carnivoro: true },
            "LEOPARDO": { tamanho: 2, bioma: ["savana"], carnivoro: true },
            "CROCODILO": { tamanho: 3, bioma: ["rio"], carnivoro: true },
            "MACACO": { tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
            "GAZELA": { tamanho: 2, bioma: ["savana"], carnivoro: false },
            "HIPOPOTAMO": { tamanho: 4, bioma: ["savana", "rio"], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {

        if (!this.animaisValidos[animal]) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        const { tamanho, bioma, carnivoro } = this.animaisValidos[animal];
        const recintosViaveis = [];

        this.recintos.forEach(recinto => {
            let espacoOcupado = recinto.animais.reduce((acc, a) => acc + a.quantidade * a.tamanho, 0);
            const espacoExtra = recinto.animais.length > 0 ? 1 : 0; // Se há mais de uma espécie, 1 espaço extra
            espacoOcupado += espacoExtra;
            const espacoLivre = recinto.tamanho - espacoOcupado;
            const biomaCompativel = bioma.includes(recinto.bioma) || (animal === "HIPOPOTAMO" && recinto.bioma === "savana e rio");
            const compartilhaCarnivoro = carnivoro && recinto.animais.length > 0 && recinto.animais.some(a => a.carnivoro);

            if (biomaCompativel && !compartilhaCarnivoro && espacoLivre >= tamanho * quantidade) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - tamanho * quantidade} total: ${recinto.tamanho})`);
            }
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }

        return { erro: null, recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
