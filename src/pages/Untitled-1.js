// ====== INGREDIENTES ======
let agua = 500; // ml
let poDeCafe = 40; // gramas
let filtro = true;
let acucar = true;

// ====== FUNÇÕES ======

function verificarIngredientes() {
    if (agua < 500) {
        console.log("Água insuficiente. Comprando mais água...");
        agua = 500;
    }

    if (poDeCafe < 40) {
        console.log("Pó insuficiente. Comprando mais pó de café...");
        poDeCafe = 40;
    }

    if (!filtro) {
        console.log("Sem filtro. Comprando filtro...");
        filtro = true;
    }

    console.log("Todos os ingredientes estão prontos!");
}

function ferverAgua() {
    let temperatura = 25;

    console.log("Colocando água para ferver...");

    while (temperatura < 100) {
        temperatura += 15;
        console.log("Temperatura: " + temperatura + "°C");
    }

    console.log("Água fervida!");
    return true;
}

function prepararFiltro() {
    console.log("Colocando " + poDeCafe + "g de pó no filtro...");
}

function extrairCafe() {
    console.log("Despejando água quente sobre o pó...");

    let gotas = 3;

    while (gotas > 0) {
        console.log("Pingando café...");
        gotas--;
    }

    console.log("Extração finalizada!");
    return "Café pronto ☕";
}

function fazerCafe() {
    console.log("Iniciando preparo do café...\n");

    verificarIngredientes();

    let aguaFervida = ferverAgua();

    if (aguaFervida) {
        prepararFiltro();
        let cafe = extrairCafe();

        if (acucar) {
            console.log("Adicionando açúcar...");
        }

        console.log("\nServindo: " + cafe);
    } else {
        console.log("Erro ao ferver água!");
    }
}

// EXECUTAR
fazerCafe();