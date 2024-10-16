export class Kodefy {

	static async runUrl(url: String, par: String, callback: any){


	var retorno: any = await fetch('https://quemsabefala.conectasuas.com.br/mentorMw/rodaTransacao', {
  					method: 'POST',
  					headers: new Headers({
    					'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' // <-- Specifying the Content-Type
						}),
					body: "transacaoMentor=397&moduloMentor=mw&objPergunta=" + JSON.stringify(pergunta)
					});
	retorno = retorno.json();
	return retorno;
	}


	static urlConexao: String;

	static mostraSql: boolean;

	static UrlRequest: String = "https://quemsabefala.conectasuas.com.br/mentorMw/";
	//"http://app.vvision.com.br:8080/assistenciaSocial/";

	// static UrlRequest:string =  "http://10.10.0.21:8080/netGasV2";

	static formataData(dt: Date) {

		if(typeof dt === 'string')
			dt = new Date(dt);
		var retorno = "";
		retorno = dt.getDate() + "";
		if (dt.getDate() < 10)
			retorno = "0" + retorno;
		retorno = retorno + "/";
		var mes = dt.getMonth() + 1;
		if (mes < 10)
			retorno = retorno + "0";
		retorno = retorno + mes + "/" + dt.getFullYear();

		return retorno;

	}


	
	static runServiceQuery(visao: number, parametros: String) {
		return this.runServiceQueryMod(null, visao, parametros);
	}


	static runServiceQueryMod(modulo: any, visao: number, parametros: String) {
		var lpar = parametros;
		if (lpar == null)
			lpar = "";
		if (modulo != null)
			lpar = lpar + "&moduloMentor=" + modulo;
		if (visao == null)
			return;
		else
			lpar = lpar + "&visaoMentor=" + visao

		try{
			//alert("vou chamar dados")
			var data: any = Kodefy.bind(lpar, "rodaVisaoOtimizada", "POST");
            
            data = data.replaceAll("&gt;",">");
            data = data.replaceAll("&lt;","<");

			alert(data)
			return (eval("(" + data + ")"));
		}catch(err){
			//alert(err)
		}
		
	}


	static bind(parametros: String, murl: String, metodo: String) {

        var url: String =Kodefy.UrlRequest.concat( murl + "") ;
		if(murl.startsWith("https"))
			url = murl;
		
		var http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/html; charset=UTF-8');
		}

		if (!http_request) {
			alert("Can't start XMLHTTP object");
			return "";
		}

		parametros = parametros + "&&randomCodeKodefy=" + (Math.random() * 10000);

		if (metodo == "GET")
			http_request.open(metodo + "", url + "?" + parametros, false);
		else
			http_request.open(metodo + "", url + "", false);

		http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		
		

		try{
			if (metodo == "GET")
			http_request.send("");
		else
			http_request.send(parametros+"");
		}catch(err){
			throw(err)
		}
		


		return http_request.responseText;

	}

	static runServiceHistory(history: number, pars: string) {
		return Kodefy.runServiceHistoryMod(null, history, pars);
	}

	static runServiceHistoryMod(module:any, history:number, pars: string, ) {
		let secret = "";


		var lpar = pars;
		if (lpar == null)
			lpar = "";
		if (module != null)
			lpar = lpar + "&moduloMentor=" + module;
		if (history == null)
			return;
		else
			lpar = lpar + "&transacaoMentor=" + history

		var data:any;
		try {
			data = Kodefy.bind(lpar, "https://quemsabefala.conectasuas.com.br/mentorMw/rodaTransacao", "POST");
		} catch (Err) {
			throw ("problema ao rodar transacao ou eval " + Err);
		}


		try {
			if (data.substring(0, 7) == "sucesso") {
				{

					return (eval("(" + data.replace("sucesso", "") + ")"));

				}
			} else {

				throw ("dey erro " + data);

			}
		} catch (Err) {
			//alert("problema ao rodar transacao ou eval " + Err);
			throw ("problema ao rodar transacao ou eval " + Err);
		}
	}

    static replacer(key: string, value:any) {
		if (key.indexOf("Formatado") > 1)
			return undefined;
		else
			return value;
	}

	static runServiceHistoryFromObj(history:number, fieldName: String, objects: any) {


		var word = JSON.stringify(objects, Kodefy.replacer);

		

		return Kodefy.runServiceHistoryMod("mw", history, fieldName + "=" + word + "");
	}

}

export class TimeServerProces{

	sto: any;
	ts: Array<any> = new Array();
	setup:any = null;

	qtTime: number = 0;
	totalTime: number = 0;
	delay: number = 0;

	indice:number = 0;

	constructor(storage: any, setup:any, indice:number){
		this.sto = storage;
		this.ts = setup.timeServers;
		this.setup = setup;
		this.indice = indice;
	}
	




	public stepTime(){
 
		
		var antes = new Date();
		var retorno = "";
	  
	  try{
		this.ts[this.indice].url = "https://garanhuns.vvision.com.br/teste.php";
		retorno = Kodefy.bind("",this.ts[this.indice].url ,"POST")
	  }catch(err){
	  alert("need a internet connection to sync devices time");
	  return;
	  }
	  
		  var depois = new Date();
		  
		  this.qtTime++;
		  this.totalTime = this.totalTime + (depois.getTime() -antes.getTime());
		  
		  if(this.qtTime <7){
			setTimeout(() => {
			  this.stepTime();
				
			  }, 200);	
		  }else
		  {
		  
			  this.delay = this.totalTime / 14;
			  retorno = eval(retorno) + this.delay;
			
			  this.delay = (new Date()).getTime() - (+retorno);	
			
			  var hora = new Date(new Date().getTime()-this.delay);
			
	  		try{
	 			 this.sto.set("delay",this.delay);
				 this.ts[this.indice].delay = this.delay;

				 this.sto.set("setup",this.setup);
	    
		   }catch(err){
			  alert(err)
		  };
	  
	  }
		  
		  
	   }
}

