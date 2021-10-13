$(function(){

    /* Sistema de pesquisa */
    
    var currentValue = 0;
    var isDrag = false;
    var valor_maximo = 70000;
    var preco_atual = 0;

    $('.pointer-barra').mousedown(function(){
        isDrag = true;
    })

    $(document).mouseup(function(){
        isDrag = false;
        enableTextSelection();
    })
    
    $('.barra-preco').mousemove(function(e){
        disableTextSelection();
        if(isDrag == true){
            var elBase = $(this);
            var mouseX = e.pageX - elBase.offset().left;
            
            if(mouseX < 0)
                mouseX = 0;
            if(mouseX > elBase.width())
                mouseX = elBase.width();

            $('.pointer-barra').css('left', (mouseX - 13)+'px');
            
            var currentValue = (mouseX / elBase.width()) * 100;
            
            $('.barra-preco-fill').css('width', currentValue+'%');

            //TODO: Ajeitar o formato do preço
            preco_atual = (currentValue/100) * valor_maximo;
            preco_atual = formatarPreco(preco_atual);
            $('.preco_pesquisa').html('R$'+preco_atual);
        }
    })

    function formatarPreco(preco_atual){
        preco_atual = preco_atual.toFixed(2);
        preco_arr = preco_atual.split('.');

        var novo_preco = formatarTotal(preco_arr);

        return novo_preco;
    }

    function formatarTotal(preco_arr){
        if(preco_arr[0] < 1000){
            return preco_arr[0]+','+preco_arr[1];
        }else if(preco_arr[0] < 10000){
            return preco_arr[0][0]+'.'+preco_arr[0].substr(1,preco_arr[0].length)+','+preco_arr[1];
        }else{
            return preco_arr[0][0]+preco_arr[0][1]+'.'+preco_arr[0].substr(2,preco_arr[0].length)+','+preco_arr[1];
        }
    }


    function disableTextSelection(){
        $('.body').css('-webkit-user-select', 'none');
        $('.body').css('-moz-user-select', 'none');
        $('.body').css('-ms-user-select', 'none');
        $('.body').css('-o-user-select', 'none');
        $('.body').css('user-select', 'none');
    }

    function enableTextSelection(){
        $('.body').css('-webkit-user-select', 'auto');
        $('.body').css('-moz-user-select', 'auto');
        $('.body').css('-ms-user-select', 'auto');
        $('.body').css('-o-user-select', 'auto');
        $('.body').css('user-select', 'auto');
    }


    /*

        Sistema de Slide da pagina individual de cada carro! 

    */

    var imgShow = 3;
    var maxIndex = Math.ceil($('.mini-img-wraper').length/3) -1;
    var curIndex = 0;

    function initSlider(){
        var amt = $('.mini-img-wraper').length * 33.3;
        var elScroll = $('.nav-galeria-wraper');
        var elSingle = $('.mini-img-wraper');

        elScroll.css('width', amt+'%');
        elSingle.css('width',33.3*(100/amt)+'%');
    }

    function navigateSlider(){
        $('.arrow-right-nav').click(function(){
            if(curIndex < maxIndex){
                curIndex++;
                var elOff = $('.mini-img-wraper').eq(curIndex * 3).offset().left - $('.nav-galeria-wraper').offset().left;
                $('.nav-galeria').animate({ 'scrollLeft': elOff + 'px' });
            }else{
               // console.log('Chegamos ate o final');
            }
        });

        $('.arrow-left-nav').click(function(){
            if(curIndex > 0){
                curIndex--;
                var elOff = $('.mini-img-wraper').eq(curIndex * 3).offset().left - $('.nav-galeria-wraper').offset().left;
                $('.nav-galeria').animate({ 'scrollLeft': elOff + 'px' });
            }else{
               // console.log('Chegamos ate o inicio');
            }
        });
    }

    function clickSlider(){
        $('.mini-img-wraper').click(function(){
            $('.mini-img-wraper').css('background-color','transparent');
            $(this).css('background-color','rgb(210,210,210)');

            var img = $(this).children().css('background-image');
            $('.foto-destaque').css('background-image',img);
        })

        $('.mini-img-wraper').eq(0).click();
    }

    /* Clicar e ir para a div de contato com base no atriuto goto */

    var directory = '/Curso Webmaster/Projeto_05/projeto_05/'

    $('[goto=contato]').click(function(){

        location.href=directory+'index.html?contato';
        return false;
    })

    function checkUrl(){

        var url = location.href.split('/');
        var curPage = url[url.length-1].split('?')


        if(curPage[1] != undefined && curPage[1] == 'contato'){
            $('header nav a').css('color','black');
            $('footer nav a').css('color','white');
            $('[goto=contato]').css('color','#EB2D2D');
            $('html,body').animate({'scrollTop':$('#contato').offset().top});
        }
    }

    /* menu responsivo  */

    $('.mobile').click(function(){
        $(this).find('ul').slideToggle()
    })


    /* Sistema de navegação nos depoimentos da index.html */

    var amtDepoimento = $('.depoimento-single p').length;
    var curIndex = 0;

    function iniciarDepoimentos(){
        $('.depoimento-single p').hide();
        $('.depoimentos-single p').eq(0).show();
    }

    function navegarDepoimentos(){
        $('[next]').click(function(){
                curIndex++;
                if(curIndex >= amtDepoimento)
                    curIndex = 0;
                    $('.depoimento-single p').hide();
                    $('.depoimentos-single p').eq(curIndex).show();
        })

        $('[prev]').click(function(){
            curIndex--;
                if(curIndex < 0)
                    curIndex = amtDepoimento-1;
                    $('.depoimento-single p').hide();
                    $('.depoimentos-single p').eq(curIndex).show();
        })
    }


    iniciarDepoimentos();
    navegarDepoimentos();
    checkUrl();
    initSlider();
    navigateSlider();
    clickSlider();
})