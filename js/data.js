// Product catalog data converted from CSV
const productData = {
    "ellejanooyente": {
        "nombre": "ellejanooyente",
        "grupo": "atenciontsunami", 
        "tipo": "disco",
        "estado": "reedit",
        "bcalbum": "4042535803",
        "img": "ellejanooyente",
        "formato": "CD",
        "lanzamiento": "Enero 2009",
        "precio": "10 €",
        "btnppal": "2531852"
    },
    "elcuerpohumano": {
        "nombre": "elcuerpohumano",
        "grupo": "incendios",
        "tipo": "disco", 
        "estado": "ok",
        "bcalbum": "3660433808",
        "img": "elcuerpohumano",
        "formato": "Vinilo 12 '' + CD",
        "lanzamiento": "Marzo 2013",
        "precio": "10 €",
        "btnppal": "3PD4B4QQ8X7CA"
    },
    "quelecortenlacabeza": {
        "nombre": "quelecortenlacabeza",
        "grupo": "atenciontsunami",
        "tipo": "disco",
        "estado": "ok", 
        "bcalbum": "2497391259",
        "img": "quelecortenlacabeza",
        "formato": "Vinilo 12 '' + CD",
        "lanzamiento": "6 de Mayo 2014",
        "precio": "14 €",
        "btnppal": "5CFXS8QPPESMC"
    },
    "pensamientodepaz": {
        "nombre": "pensamientodepaz",
        "grupo": "paracaidas",
        "tipo": "disco",
        "estado": "ok",
        "bcalbum": "2016021601", 
        "img": "pensamientodepaz",
        "formato": "Vinilo 10 '' + CD",
        "lanzamiento": "1 de Abril 2015",
        "precio": "12 €",
        "btnppal": "G4LRFCNVLKW98"
    },
    "sillasvoladoras": {
        "nombre": "sillasvoladoras",
        "grupo": "incendios",
        "tipo": "disco",
        "estado": "ok",
        "bcalbum": "2920496214",
        "img": "sillasvoladoras", 
        "formato": "Vinilo 12 '' + CD",
        "lanzamiento": "28 de octubre 2015",
        "precio": "14 €",
        "btnppal": "JJYXKGU32N9TN"
    },
    "silencioretaguardia": {
        "nombre": "silencioretaguardia",
        "grupo": "atenciontsunami",
        "tipo": "disco",
        "estado": "reedit",
        "bcalbum": "1439761701",
        "img": "silencioretaguardia",
        "formato": "Vinilo 12 ''",
        "lanzamiento": "4 de noviembre 2016", 
        "precio": "14 €",
        "btnppal": "QNGUARE5KGYRG"
    },
    "realejo": {
        "nombre": "realejo",
        "grupo": "autumncomets",
        "tipo": "disco",
        "estado": "nobandcamp",
        "bcalbum": "",
        "img": "realejo",
        "formato": "Vinilo 12 ''",
        "lanzamiento": "17 de noviembre 2017",
        "precio": "16.95 €",
        "btnppal": "GE5VTWK7DEN4L"
    },
    "vltra": {
        "nombre": "vltra",
        "grupo": "atenciotsunami", 
        "tipo": "disco",
        "estado": "ok",
        "bcalbum": "828241542",
        "img": "vltra",
        "formato": "Vinilo 12 ''",
        "lanzamiento": "29 de marzo 2019",
        "precio": "15 €",
        "btnppal": "EUCMAKEUQU3DC"
    },
    "pensamientomagico": {
        "nombre": "pensamientomagico",
        "grupo": "disciplinaatlantico",
        "tipo": "disco",
        "estado": "bandcamp",
        "bcalbum": "3716877208",
        "img": "pensamientomagico",
        "formato": "Vinilo 12 ''",
        "lanzamiento": "9 de marzo 2021",
        "precio": "18 €",
        "btnppal": "",
        "bcurl": "https://disciplinaatlantico.bandcamp.com/album/pensamiento-m-gico"
    },
    "metavolante": {
        "nombre": "metavolante",
        "grupo": "metavolante",
        "tipo": "disco", 
        "estado": "preorder",
        "bcalbum": "2299872180",
        "img": "metavolante",
        "formato": "Vinilo 12 ''",
        "lanzamiento": "16 de abril 2021",
        "precio": "15 €",
        "btnppal": "UGDM9XVM6MCQJ"
    }
};

// Make productData globally accessible
window.productData = productData;

// Page content data
const pageContent = {
    "grupos/at": {
        title: "ATENCIÓN TSUNAMI",
        image: "images/at_selr_1200.jpg",
        imageCredit: 'Foto: <a href="http://nsefotografia.com/">Mariano Regidor</a>',
        social: {
            facebook: "http://www.facebook.com/atencion.tsunami",
            instagram: "http://instagram.com/atenciontsunami", 
            bandcamp: "http://atenciontsunami.bandcamp.com"
        },
        files: [
            { name: "Nota de prensa", url: "grupos/at/AT_VLTRA_Prensa.pdf" },
            { name: "Rider", url: "grupos/at/rider_at.pdf" }
        ],
        content: `
            <p>
                Tres años después de <i>Silencio en la retaguardia (RDM 2016)</i> —mejor disco español del año para El
                Cultural de El Mundo y mejor disco del año en Madrid para la revista Mondosonoro— <strong>Atención Tsunami</strong>
                regresan al ruido ibérico con <i>VLTRA</i>.
            </p>
            <p>
                Tras una larga gestación, la criatura ha salido fiera y hermosa: ocho cortes crudos y directos, rebosantes
                de gasolina, lírica y mucho whammy (¿quién quiere autotune teniendo <i>whammy</i>?). Esta vez, el ritmo y la
                palabra ganan la partida a la melodía, y la urgencia a la introspección. <i>Vltra</i> («más allá») es un disco ambivalente,
                un viaje que aborda la sensación planetaria de ir de cabeza hacia al abismo, pero que se aferra en el último momento a la esperanza
                de que los círculos viciosos (los propios mentales y los de regresión política y social) pueden y deben
                romperse. Claro que sí.
            </p>
            <p>
                <strong>Disoriented Adult Rock para tiempos oscuros.</strong>
            </p>
        `
    },
    "grupos/inc": {
        title: "INCENDIOS",
        image: "images/incendios_1200.jpg",
        imageCredit: '',
        social: {
            facebook: "http://www.facebook.com/incendiosband",
            instagram: "http://instagram.com/losincendios",
            bandcamp: "http://losincendios.bandcamp.com"
        },
        files: [
            { name: "Nota de prensa", url: "grupos/inc/prensa_Incendios.pdf" },
            { name: "Rider", url: "grupos/inc/rider_incendios.pdf" }
        ],
        content: `
            <p>
            Si en su debut, El cuerpo humano (Estoescasa 2013), Incendios ya construían con solvencia paisajes de pop emocional con una madurez y contención a prueba de vueltas, con Las sillas voladoras (RDM 2015) el grupo expande su paleta de colores para permitir que las canciones estallen en múltiples direcciones.
            </p>
            <p>
            La matemática espontánea de Incendios genera una ecuación en la que sencillez y complejidad se equilibran: preciosista sin ser efectista, frágil pero poderosa, sensible sin ser cursi, espacial pero doméstica. Como una silla voladora. Compren su ticket y tomen asiento. Despegamos
            </p>
            <br>
            <iframe src="https://www.youtube.com/embed/i7MJeYEV81c?rel=0" min-width="660px" width="100%" height="405px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        `
    },
    "grupos/par": {
        title: "PARACAÍDAS",
        image: "images/paracaidas_1200.jpg",
        imageCredit: 'Foto: <a href="http://www.jaellevi.com/">Jael Levi</a>',
        social: {
            facebook: "http://www.facebook.com/paracaidasband",
            instagram: "http://instagram.com/paracaidas_",
            bandcamp: "http://paracaidas.bandcamp.com"
        },
        files: [
            { name: "Nota de prensa", url: "grupos/par/prensa_Paracaidas.pdf" },
            { name: "Rider", url: "grupos/par/paracaidas_Stage.jpg" }
        ],
        content: `
            <p>
            Paracaídas son cuatro amigos con una capacidad asombrosa para simultanear
            y multiplicar sin control proyectos paralelos y perpendiculares, la mayoría
            de ellos, compartidos. Los primeros ensayos datan de diciembre de 2011
            y sus esporádicos conciertos, desde febrero de 2012, eran la única manera de
            seguirles la pista. Hasta ahora. Miguel e Iñaki (Atención Tsunami, Incendios,
            Karen Koltrane), Rodrigo (Incendios, Dol, Hestiu Ròïn) y Pablo (Autumn Comets,
            Bel Bee Be, Karen Koltrane) entregan con Pensamiento de paz durante
            un ataque aéreo las pruebas de que esto de Paracaídas también va en serio.
            </p>
        `
    },
    "info": {
        title: "INFO",
        image: "images/quien.jpg",
        imageCredit: '<a href="http://www.alvpeerz.com/">Foto: Álvaro Pérez</a>',
        content: `
            <p><strong>Récords del Mundo</strong> es la casa de discos del colectivo que integran desde 2014 los
            componentes de Atención Tsunami junto a Rodrigo (Ediciones Ochoacostado), Pablo (producción) y Emilio
            y Gonzalo (diseño). Nueve plusmarquistas del amor al arte que aúnan su experiencia previa y paralela en
            otras plataformas autogestionadas para seguir haciendo, juntos, lo que les gusta.
            </p>
            <p id="mailp1"><span class="titulo">Contacto</span><br>
            <a href="mailto:info@recordsdelmundo.es">info@recordsdelmundo.es</a>
            </p>
            <p id="mailp2"><span class="titulo">Contratación, comunicación y prensa</span><br>
            <span class="nombre">Miguel Bellas</span><br>
            <a href="mailto:miguel@recordsdelmundo.es">miguel@recordsdelmundo.es</a>
            </p>
        `
    }
};
