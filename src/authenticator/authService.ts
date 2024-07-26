import { OrgRepository } from '@repositories/orgRepository';
// Remova importação desnecessária
// import bcrypt from 'bcryptjs';

export class AuthService {
  constructor(private orgRepository: OrgRepository) {}

  async authenticate(email: string, password: string) {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      console.log('Org not found');
      throw new Error('Organization not found');
    }

    // Comparar a senha diretamente sem hash
    if (password !== org.password) {
      console.log('Password does not match');
      throw new Error('Invalid email or password');
    }

    console.log('Authentication successful');
    return org;
  }
}

