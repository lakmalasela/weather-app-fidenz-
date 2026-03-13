import Swal from 'sweetalert2'

// Swal.fire({
//   title: "Are you sure?",
//   text: "You won't be able to revert this!",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonColor: "#3085d6",
//   cancelButtonColor: "#d33",
//   confirmButtonText: "Yes, delete it!"
// }).then((result) => {
//   if (result.isConfirmed) {
//     Swal.fire({
//       title: "Deleted!",
//       text: "Your file has been deleted.",
//       icon: "success"
//     });
//   }
// });

export const swalAlert = (messageTitle, messageText, subMessageTitle, subMessageText, confrimButtonText) => {
    return Swal.fire({
        title: messageTitle,
        text: messageText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confrimButtonText
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: subMessageTitle,
                text: subMessageText,
                icon: "success"
            });
        }
        return result; // Return the result for chaining
    });
}