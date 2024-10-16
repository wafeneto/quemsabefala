
import React, { useEffect, useState } from 'react';

export class Kodefy {

  static colaborador = null;
  

    static async runUrl(url, par){


      var retorno = await fetch(url, {
                method: 'POST',
                headers: new Headers({
                  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' // <-- Specifying the Content-Type
                }),
              body: par
              });
      retorno = await retorno.json();
      return retorno;
      }
   
      static async runQry( visao){

       {

   
    
          var json = await fetch('https://quemsabefala.conectasuas.com.br/mentorMw/rodaVisao?visaoMentor=669')

            json = await json.json()
            return json
          }
            
            
        }
    
static async  oiLib(metodo ){
    var a = await fetch("https://treinamento.netgas.eco.br/mentorMw/rodaVisao?visaoMentor=231")
    var b = await a.json()

    b.nome = 'ariostro'
    //alert((b.mentorClasse))

    metodo(b)
    }

    
    static async runServiceQueryMod( visao, parametros) {

        var urlBase = "https://treinamento.netgas.eco.br/mentorMw"

		var lpar = parametros;
		if (lpar == null)
			lpar = "";
		
		try{
			//alert("vou chamar dados" +  urlBase + "/rodaVisao?visaoMentor=" + visao + "&" + lpar)

           var retorno = await fetch( "https://quemsabefala.conectasuas.com.br/mentorMw/rodaVisao?visaoMentor=669")
			
            var retorno2 = await retorno.json()

            return(retorno2)
			//return ("retorno2");
		}catch(err){
			alert(err)
		}
		
	}
  }