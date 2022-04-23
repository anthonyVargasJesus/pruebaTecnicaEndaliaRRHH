import Swal from 'sweetalert2';


export class ErrorManager {

    public static handleError(err: any) {

      //save to error log
      console.log('error:',err);

      if (err.status === 500) {
        Swal.fire(err.statusText, 'Hubo un error en el servidor','error');
        return;
      }

      if (err.status === 0) {
        Swal.fire(err.statusText, 'Hubo un error desconocido','error');
        return;
      }

       if (err.error.custom) {
        let errors = [];
        errors = err.error.errors.errors;
        var result = errors.map((item: any) => { return item.msg }).join('<br>')
        Swal.fire("Advertencia", result.toString() ,'warning');
        return;
       }


      }


  }