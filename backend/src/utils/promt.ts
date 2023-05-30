

export const promt = (denunciaName: string, descripcion: string) => {
  const promtMessage = `Verifica si la denuncia "${denunciaName}" se relaciona con la siguiente descripción proporcionada 
  por el usuario: "${descripcion}". Si la descripción está correcta, 
  RESPONDEME UNICAMENTE CON LA PALABRA "Ok". Si la descripción no está relacionada, 
  contiene palabras ofensivas, o hay algún otro error, 
  RESPONDEME UNICAMENTE CON UN BREVE, MUY BREVE MENSAJE DE ERROR que pueda transmitir 
  al usuario para explicarle el error cometido`

  return promtMessage
}



// `Tengo una aplicación móvil para recibir las denuncias de 
//   los ciudadanos del municipio de Santa Cruz de la Sierra, Bolivia. Necesito verificar 
//   si la denuncia "${denunciaName}" se relaciona con la descripción proporcionada por el 
//   usuario: "${descripcion}". Si la descripción está correcta, RESPONDEME UNICAMENTE CON LA PALABRA "Ok". 
//   SI LA DESCRIPCIÓN NO ESTA RELACIONADA, contiene palabras ofensivas, etc, RESPONDEME UNICAMENTE CON 
//   UN BREVE, MUY BREVE MENSAJE DE ERROR que pueda transmitir al usuario para explicarle el error 
//   cometido`
