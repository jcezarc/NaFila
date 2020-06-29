export interface AddressModel {
    CEP: string
    logradouro: string
    bairro: string
    localidade: string
    uf: string
    complemento: string
}

export interface SearchZipModel{
    CEP: string
    complemento: string
}