window.salaoContent = {
  business: {
    name: "Salão Corte E Cor",
    professional: "Lucilene Silva",
    category: "Salão de Beleza",
    slogan: "Cuidando da sua beleza",
    summary: "Especialista em cortes, mechas, coloração e tratamentos capilares em Cerquilho.",
    phone: "(15) 99714-6833",
    phoneHref: "tel:+5515997146833",
    address: {
      street: "Rua Doutor Campos, 951",
      neighborhood: "Nossa Senhora de Lourdes",
      city: "Cerquilho",
      state: "SP",
      postalCode: "18520-176"
    },
    rating: 4.9,
    reviewCount: 22,
    instagram: "https://www.instagram.com/centrodebelezacorteecor/",
    whatsapp: "https://wa.me/message/CHSJ5ETGMGOBL1?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.%20Poderia%20confirmar%20os%20hor%C3%A1rios%20dispon%C3%ADveis%3F",
    map: "https://www.google.com/maps/search/?api=1&query=Rua+Doutor+Campos%2C+951%2C+Nossa+Senhora+de+Lourdes%2C+Cerquilho%2C+SP",
    instagramHandle: "@centrodebelezacorteecor"
  },

  hours: [
    { day: "Segunda-feira", value: "Fechado" },
    { day: "Terça-feira", value: "09:00 – 17:00" },
    { day: "Quarta-feira", value: "09:00 – 18:00" },
    { day: "Quinta-feira", value: "09:00 – 18:00" },
    { day: "Sexta-feira", value: "08:30 – 18:30" },
    { day: "Sábado", value: "09:00 – 17:00" },
    { day: "Domingo", value: "Fechado" }
  ],

  services: [
    { name: "Cortes de cabelo", description: "Cortes pensados para valorizar o seu estilo e a saúde dos fios.", icon: "scissors" },
    { name: "Mechas e balayage", description: "Iluminação, balayage e tons personalizados para cada cabelo.", icon: "balayage" },
    { name: "Coloração", description: "Cores e transformações com olhar técnico e cuidado em cada etapa.", icon: "color" },
    { name: "Tratamentos capilares", description: "Cronograma, alinhamento e cuidados para devolver vida aos fios.", icon: "treatment" },
    { name: "Maquiagem e penteados", description: "Produções para eventos, madrinhas, noivas e momentos especiais.", icon: "makeup" },
    { name: "Sobrancelhas e cílios", description: "Design, embelezamento e alongamento para realçar o olhar.", icon: "eye" }
  ],

  gallery: [
    {
      id: "DdeOWFoIESN",
      service: "Maquiagem e penteado coque baixo clássico",
      shortService: "Maquiagem e penteado",
      sourceUrl: "https://www.instagram.com/p/DdeOWFoIESN/",
      images: [1, 2, 3, 5].map((number) => ({
        src: `assets/galeria/DdeOWFoIESN/imagem-${String(number).padStart(2, "0")}.jpg`,
        alt: `Resultado de ${"maquiagem e penteado coque baixo clássico"} — imagem ${number}`
      }))
    },
    {
      id: "DdKYQlCoOpx",
      service: "Mechas em tom honey blonde / morena iluminada",
      shortService: "Honey blonde / morena iluminada",
      sourceUrl: "https://www.instagram.com/p/DdKYQlCoOpx/",
      images: [1, 3, 4].map((number) => ({
        src: `assets/galeria/DdKYQlCoOpx/imagem-${String(number).padStart(2, "0")}.jpg`,
        alt: `Resultado de mechas honey blonde e morena iluminada — imagem ${number}`
      }))
    },
    {
      id: "DdpdXF6IPko",
      service: "Balayage / mechas loiras",
      shortService: "Balayage e mechas loiras",
      sourceUrl: "https://www.instagram.com/p/DdpdXF6IPko/",
      images: [1, 2, 3].map((number) => ({
        src: `assets/galeria/DdpdXF6IPko/imagem-${String(number).padStart(2, "0")}.jpg`,
        alt: `Resultado de balayage e mechas loiras — imagem ${number}`
      }))
    },
    {
      id: "Ddwrv7ZIKLT",
      service: "Maquiagem e penteado clássico para madrinha",
      shortService: "Produção para madrinha",
      sourceUrl: "https://www.instagram.com/p/Ddwrv7ZIKLT/",
      images: [1, 2, 3].map((number) => ({
        src: `assets/galeria/Ddwrv7ZIKLT/imagem-${String(number).padStart(2, "0")}.jpg`,
        alt: `Resultado de maquiagem e penteado clássico para madrinha — imagem ${number}`
      }))
    },
    {
      id: "DeN2fFHoJHp",
      service: "Corte de cabelo e mechas Latte Macchiato",
      shortService: "Corte e mechas Latte Macchiato",
      sourceUrl: "https://www.instagram.com/p/DeN2fFHoJHp/",
      images: [1, 2, 3, 4, 5, 8].map((number) => ({
        src: `assets/galeria/DeN2fFHoJHp/imagem-${String(number).padStart(2, "0")}.jpg`,
        alt: `Resultado de corte de cabelo e mechas Latte Macchiato — imagem ${number}`
      }))
    }
  ],

  reviews: [
    { name: "Rose", profile: "Local Guide · 57 avaliações · 4 fotos", rating: 5, date: "3 anos atrás", text: "Minha experiência neste lugar foi excelente fiquei muito satisfeita com o trabalho realizado a Lu é super profissional e segura do seu trabalho da o seu melhor pras clientes , sua mais importante ferramenta é as suas mãos abençoada por Deus. Eu sou a Rose eu super recomendo esse salão pra todas as pessoas que como eu amam os seu cabelos esse salão é de milhões que Deus abençoe a todos que lerem .", response: "", featured: true, sourceUrl: "https://www.google.com/maps/contrib/102523745641621459259/reviews?hl=pt-BR" },
    { name: "Maria dioneide Santos Vieira Maria", profile: "Local Guide · 53 avaliações", rating: 5, date: "um ano atrás", text: "Profissional maravilhosa, trabalha com produtos muito bom, e o ambiente tem uma energia de paz.", response: "Gratidão 🙏❤️", featured: true, sourceUrl: "https://www.google.com/maps/contrib/111120358712039942926/reviews?hl=pt-BR" },
    { name: "Francisco De Azereredo", profile: "Local Guide · 94 avaliações", rating: 5, date: "um ano atrás", text: "Excelente atendimento.", response: "", featured: true, sourceUrl: "https://www.google.com/maps/contrib/106004981105674265736/reviews?hl=pt-BR" },
    { name: "Jamile Almeida", profile: "2 avaliações", rating: 5, date: "2 anos atrás", text: "Ótimas profissionais...", response: "", featured: true, sourceUrl: "https://www.google.com/maps/contrib/118277009712931692985/reviews?hl=pt-BR" },
    { name: "Sara Valim", profile: "Local Guide · 13 avaliações · 15 fotos", rating: 5, date: "2 anos atrás", text: "Excelente!", response: "", featured: true, sourceUrl: "https://www.google.com/maps/contrib/101775177504498397797/reviews?hl=pt-BR" },
    { name: "Antonio Thiago Carvalho", profile: "Local Guide · 7 avaliações · 1 foto", rating: 5, date: "um ano atrás", text: "Sem texto escrito; avaliação somente com nota.", response: "", sourceUrl: "https://www.google.com/maps/contrib/109990207816298144130/reviews?hl=pt-BR" },
    { name: "Crispim Lima Oliveira", profile: "Local Guide · 9 avaliações · 3 fotos", rating: 5, date: "11 meses atrás", text: "Sem texto escrito; avaliação somente com nota.", response: "", sourceUrl: "https://www.google.com/maps/contrib/109425190479363267664/reviews?hl=pt-BR" },
    { name: "Sr. Guh 157", profile: "Local Guide", rating: 4, date: "2 anos atrás", text: "Sem texto escrito; avaliação somente com nota.", response: "", sourceUrl: "https://www.google.com/maps/contrib/117884034959375082715/reviews?hl=pt-BR" },
    { name: "Josy Oliveira", profile: "4 avaliações · 1 foto", rating: 5, date: "2 anos atrás", text: "Sem texto escrito; avaliação somente com nota.", response: "", sourceUrl: "https://www.google.com/maps/contrib/111532282854050294189/reviews?hl=pt-BR" },
    { name: "Elizabeth Mota", profile: "Local Guide · 5 avaliações · 17 fotos", rating: 5, date: "3 anos atrás", text: "Sem texto escrito; avaliação somente com nota.", response: "", sourceUrl: "https://www.google.com/maps/contrib/100115018595534652166/reviews?hl=pt-BR" },
    { name: "Feh Stoski", profile: "Avaliação pública", rating: 5, date: "3 anos atrás", text: "Sem texto escrito; avaliação somente com nota.", response: "", sourceUrl: "https://www.google.com/maps/contrib/105600459019386428233/reviews?hl=pt-BR" },
    { name: "Vitor", profile: "5 avaliações", rating: 5, date: "3 anos atrás", text: "Sem texto escrito; avaliação somente com nota.", response: "", sourceUrl: "https://www.google.com/maps/contrib/103172533528483444214/reviews?hl=pt-BR" },
    { name: "Daniel Santos", profile: "1 avaliação", rating: 5, date: "3 anos atrás", text: "Sem texto escrito; avaliação somente com nota.", response: "", sourceUrl: "https://www.google.com/maps/contrib/114734731257983717972/reviews?hl=pt-BR" },
    { name: "Alda Cristina B. Garcia", profile: "7 avaliações", rating: 5, date: "3 anos atrás", text: "Sem texto escrito; avaliação somente com nota.", response: "", sourceUrl: "https://www.google.com/maps/contrib/111126767019445145433/reviews?hl=pt-BR" },
    { name: "Celio Marcolino", profile: "Local Guide · 346 avaliações", rating: 5, date: "4 anos atrás", text: "Sem texto escrito; avaliação somente com nota.", response: "", sourceUrl: "https://www.google.com/maps/contrib/117556084142265929132/reviews?hl=pt-BR" },
    { name: "Carlos Alberto", profile: "4 avaliações", rating: 5, date: "5 anos atrás", text: "Sem texto escrito; avaliação somente com nota.", response: "", sourceUrl: "https://www.google.com/maps/contrib/105088349234669952392/reviews?hl=pt-BR" },
    { name: "Cibele Santos", profile: "Avaliação pública", rating: 5, date: "5 anos atrás", text: "Sem texto escrito; avaliação somente com nota.", response: "", sourceUrl: "https://www.google.com/maps/contrib/110511848119365498236/reviews?hl=pt-BR" },
    { name: "Andreia Chaves", profile: "1 avaliação · 4 fotos", rating: 5, date: "5 anos atrás", text: "Sem texto escrito; avaliação somente com nota.", response: "", sourceUrl: "https://www.google.com/maps/contrib/109137097589295215267/reviews?hl=pt-BR" },
    { name: "Werick Campos", profile: "4 avaliações · 1 foto", rating: 5, date: "7 anos atrás", text: "Sem texto escrito; avaliação somente com nota.", response: "", sourceUrl: "https://www.google.com/maps/contrib/107296688782942133348/reviews?hl=pt-BR" }
  ]
};
