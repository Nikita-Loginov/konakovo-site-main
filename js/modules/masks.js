export function maskTel() {
  const maskTels = document.querySelectorAll("input[name='tel']");

  maskTels.forEach((tel) => {
    const maskOptions = {
      mask: "+{7} (000) 000-00-00",
    };
    const mask = IMask(tel, maskOptions);
  });
}
