export const filterList = [
  {
    id: 1,
    value: "Sindicato / Encargados",
  },

  {
    id: 21,
    value: "Mantenimiento de partes comunes",
  },
  {
    id: 22,
    value: "Mantenimiento de partes privadas",
  },
  {
    id: 389,
    value: "Normativas generales consorciales",
  },
  {
    id: 288,
    value: "Normativas generales administradores",
  },
  {
    id: 4,
    value: "AFIP",
  },
  {
    id: 5,
    value: "Seguros",
  },
]

const filterValues = [
  {
    id: 1,
    value: "Sindicato / Encargados",
    subfilters: [],
  },
  {
    id: 2,
    value: "Mantenimiento de partes",
    subfilters: [
      {
        id: 21,
        value: "Comunes",
      },
      {
        id: 22,
        value: "Privadas",
      },
    ],
  },
  {
    id: 3,
    value: "Normativas generales",
    subfilters: [
      {
        id: 389,
        value: "Consorciales",
      },
      {
        id: 288,
        value: "Administradores",
      },
    ],
  },
  {
    id: 4,
    value: "AFIP",
    subfilters: [],
  },
  {
    id: 5,
    value: "Seguros",
    subfilters: [],
  },
]

export default filterValues
