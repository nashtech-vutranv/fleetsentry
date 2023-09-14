import { NestFactory } from "@nestjs/core";
import { ValidationPipe, ValidationError, UnprocessableEntityException } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ErrorCode } from "./enums";
import { AllExceptionsFilter } from "./core/exceptions";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO setup cors
  app.enableCors();

  // TODO setup validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        try {
          const data: any = {};
          for (const err of errors) {
            data[err.property] = err.constraints ? Object.values(err.constraints) : undefined;
            if (err.children.length) {
              for (const childrenError of err.children) {
                data[childrenError.property] = Object.values(childrenError.constraints);
              }
            }
          }
          return new UnprocessableEntityException({ code: ErrorCode.E999422, errors: data });
        } catch (e) {
          return new UnprocessableEntityException({ code: ErrorCode.E999422, errors: errors });
        }
      },
    }),
  );

  // TODO setup handle global exception
  app.useGlobalFilters(new AllExceptionsFilter());

  // Setup API Document
  const config = new DocumentBuilder()
    .setTitle('API Document')
    .setDescription('The Inspection project API description')
    .setVersion('1.0')
    .addTag('API Document')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);


  await app.listen(3000);
}
bootstrap();
