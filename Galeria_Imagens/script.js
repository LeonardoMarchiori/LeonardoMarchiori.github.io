$(document).ready(function () {

    const baseImagens = {
        todas: ['imagem.jpg', 'cidade.jpg', 'animal.jpg', 'natureza.jpg'],
        natureza: ['natureza.jpg', 'natureza1.jpg', 'natureza2.jpg', 'natureza3.jpg'],
        cidade: ['cidade.jpg', 'cidade1.jpg', 'cidade2.jpg', 'cidade3.jpg'],
        animais: ['animal.jpg', 'animal1.jpg', 'animal2.jpg', 'animal3.jpg'],

    }

    function carregaImagens(categoria) {
        //console.log(baseImagens[categoria]);
        const imagens = baseImagens[categoria];

        //vai procurar a classe box-imagens dentro do body
        const boxImagens = $('body').find('.box-imagens');

        //deixa vazio os campos de imagem, para quando trocar em outra substituir e não ficar com a antiga e a nova
        boxImagens.empty();

        imagens.forEach(img => {
            console.log(img);

            //append dentro das aspas aceita html
            boxImagens.append('<div class = "imagem-item"> <div class="fechar-imagem"> X </div> <img src = "imagens/' + img + '" alt="' + img + '" /> </div>');
        });
    }

    $('.botao-categoria').on('click', function () {
        //alert($(this).data('categoria'));

        $('body').find('.botao-categoria').removeClass('active');
        $(this).addClass('active');

        const categoria = $(this).data('categoria');

        carregaImagens(categoria);

    });


    function sortImagens(sort) {
        const imagens = $('.box-imagens .imagem-item');
        imagens.sort(function (a, b) {
            console.log(a);

            const imagemA = $(a).find('img').attr('alt');
            const imagemB = $(b).find('img').attr('alt');

            console.log(imagemA);
            console.log(imagemB);

            if (sort == 'asc') {
                return imagemA.localeCompare(imagemB)
            }
            else {
                return imagemB.localeCompare(imagemA)
            }

        })

        $('body').find('.box-imagens').append(imagens);

    }

    $('body').on('click', '.botao-ordenar', function () {
        const sort = $(this).data('sort');
        sortImagens(sort);

    });

    function buscaImagens(busca) {
        const imagens = $('.box-imagens .imagem-item');
        console.log(imagens)
        imagens.each(function () {
            const nomeImagem = $(this).find('img').attr('alt');
            //const imagemVisivel = nomeImagem.includes(busca);
            const imagemVisivel = nomeImagem.startsWith(busca);
            $(this).toggle(imagemVisivel);

        });

    }

    $('#busca-imagens').on('input', function () {
        const busca = $(this).val();
        buscaImagens(busca);
    });


    $('body').on('click', 'img', function () {
        $(this).css('max-height', '100vh');
        $(this).parent().find('.fechar-imagem').show();
        $(this).parent().addClass('imagem-selecionada');
        $(this).parent().addClass('bg-img');

        $('html, body').css({
            'overflow': 'hidden',
            'height': '100%',
        });

    });

    $('body').on('click', '.fechar-imagem', function(){
        $(this).parent().removeClass('imagem-selecionada');
        $(this).parent().removeClass('bg-img');
        
        $('html, body').css({
            'overflow': 'auto',
            'height': '100vh',
        });
        
        $(this).hide();
    });

    //carregaImagens('todas');

});