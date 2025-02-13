const TEST_CONFIGS = {
    'phq-9-patient-health-questionnaire-9': {
        instructions:
            'Responde las siguientes preguntas según cómo te hayas sentido en las últimas dos semanas.',
        questions: [
            { text: 'Poco interés o placer en hacer cosas', invert: false },
            {
                text: 'Se ha sentido triste, deprimido o sin esperanza',
                invert: false,
            },
            {
                text: 'Dificultad para dormir, dormir demasiado o tener sueño durante el día',
                invert: false,
            },
            { text: 'Se ha sentido cansado o con poca energía', invert: false },
            { text: 'Poco apetito o comer en exceso', invert: false },
            {
                text: 'Se ha sentido mal consigo mismo, que es un fracaso o que ha decepcionado a su familia',
                invert: false,
            },
            {
                text: 'Dificultad para concentrarse, por ejemplo, al leer o ver la televisión',
                invert: false,
            },
            {
                text: 'Se ha movido o hablado tan lento que otras personas podrían haberlo notado, o por el contrario, ha estado tan inquieto que ha estado moviéndose mucho más de lo normal',
                invert: false,
            },
            {
                text: 'Ha tenido pensamientos de que estaría mejor muerto o de lastimarse de alguna manera',
                invert: false,
            },
        ],
        options: [
            { score: 0, text: 'Ningún día' },
            { score: 1, text: 'Varios días' },
            { score: 2, text: 'Más de la mitad de los días' },
            { score: 3, text: 'Casi todos los días' },
        ],
        calculate: (answers: number[]) => {
            const total = answers.reduce((sum, score) => sum + score, 0)

            let textResult = ''
            if (total >= 0 && total <= 4) {
                textResult = 'Depresión mínima o ausente'
            } else if (total >= 5 && total <= 9) {
                textResult = 'Depresión leve'
            } else if (total >= 10 && total <= 14) {
                textResult = 'Depresión moderada'
            } else if (total >= 15 && total <= 19) {
                textResult = 'Depresión moderadamente grave'
            } else if (total >= 20 && total <= 27) {
                textResult = 'Depresión grave'
            }

            return { total, textResult }
        },
    },
}

export default TEST_CONFIGS
