import Swal from "sweetalert2"

export const showAlert = (title = '', text = '', icon = "success") => {
  return Swal.fire({ title, text, icon })
}



export const showConfirm = async (
  title = "Are you sure?",
  text = "This action cannot be undone",
  confirmButtonText = "Yes",
  cancelButtonText = "Cancel"
) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
  });

  return result.isConfirmed;
};