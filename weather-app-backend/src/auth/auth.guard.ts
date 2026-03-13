import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { auth } from 'express-oauth2-jwt-bearer';

@Injectable()
export class AuthGuard implements CanActivate {
  private checkJwt: any;

  constructor(private configService: ConfigService) {
    const audience = this.configService.get('AUTH0_AUDIENCE');    
    const domain = this.configService.get('AUTH0_DOMAIN');
    const algorithm = this.configService.get('AUTH0_ALGORITHM');


    if (!audience || !domain) {
      throw new Error('Missing Auth0 configuration. Please check your .env file.');
    }

    this.checkJwt = auth({
      audience: audience,
      issuerBaseURL: domain.startsWith('http') ? domain : `https://${domain}`,
      tokenSigningAlg: algorithm as any,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    try {

      await new Promise((resolve, reject) => {

        this.checkJwt(request, response, (err) => {
          if (err) reject(err);
          resolve(true);
        });

      });

      return true;

    } catch (error) {
      console.error('JWT validation error:', error.message);
      response.status(401).json({ 
        message: 'Unauthorized - Invalid or expired token',
        error: error.message 
      });
      return false;
    }

  }

}