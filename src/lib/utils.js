module.exports = {
    date (timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        } 

    },

    formatCpfCnpj(value) {
        value = value.replace(/\D/g,"")

        if(value.length > 14)
            value = value.slice(0,-1)

        //verifica se é cpf ou cnpj
        if(value.length > 11) {
            //cnpj
            value = value.replace(/(\d{2})(\d)/, "$1.$2")

            value = value.replace(/(\d{3})(\d)/, "$1.$2")

            value = value.replace(/(\d{3})(\d)/, "$1/$2")

            value = value.replace(/(\d{4})(\d)/, "$1-$2")

        } else {
            //cpf
            value = value.replace(/(\d{3})(\d)/, "$1.$2")

            value = value.replace(/(\d{3})(\d)/, "$1.$2")

            value = value.replace(/(\d{3})(\d)/, "$1-$2")
        }

        return value
    },
}