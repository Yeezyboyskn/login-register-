describe('Pruebas de Autenticación de Usuario', () => {
  
  it('Debería registrar un nuevo usuario', () => {
    cy.visit('/auth/register');
    
    // Completar el formulario de registro
    cy.get('input[name="username"]').type('nuevoUsuario');
    cy.get('input[name="email"]').type('nuevo@usuario.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('input[name="confirm_password"]').type('123456');
    cy.get('button[type="submit"]').click();
    
    // Verifica que la redirección haya sido exitosa
    cy.url().should('include', '/auth/login');
    
    // Verifica que el mensaje de éxito aparezca después del registro
    cy.contains('Usuario registrado con éxito', { timeout: 10000 }).should('be.visible');
  });

  it('Debería iniciar sesión con credenciales válidas', () => {
    cy.visit('/auth/login');
    
    // Completar el formulario de inicio de sesión
    cy.get('input[name="username"]').type('nuevoUsuario');  // Asegúrate de que el usuario esté registrado
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    
    // Verifica que el inicio de sesión sea exitoso
    cy.url().should('not.include', '/auth/login');
    cy.contains('Bienvenido').should('be.visible');
  });

  it('Debería mostrar un error de login si las credenciales son incorrectas', () => {
    cy.visit('/auth/login');
    
    // Completar el formulario de inicio de sesión con credenciales incorrectas
    cy.get('input[name="username"]').type('usuarioIncorrecto');
    cy.get('input[name="password"]').type('1234');
    cy.get('button[type="submit"]').click();
    
    // Verifica que el mensaje de error aparezca
    cy.contains('Usuario o contraseña incorrectos', { timeout: 10000 }).should('be.visible');
  });

});
