import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { BanksService } from './banks.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { ImageFileInterceptor } from 'src/common/interceptors/image-file.interceptor';

@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Post('create')
  @UseInterceptors(ImageFileInterceptor('icon'))
  create(@Body() createBankDto: CreateBankDto) {
    return this.banksService.create(createBankDto);
  }

  // @Get()
  // findAll() {
  //   return this.banksService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.banksService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
  //   return this.banksService.update(+id, updateBankDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.banksService.remove(+id);
  // }
}
