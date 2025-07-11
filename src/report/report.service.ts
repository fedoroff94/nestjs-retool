import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepo: Repository<Report>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateReportDto) {
    const user = await this.userRepo.findOneBy({ id: dto.userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const report = this.reportRepo.create({
      title: dto.title,
      description: dto.description,
      user: user,
    });

    return this.reportRepo.save(report);
  }

  findAll() {
    return this.reportRepo.find();
  }

  findOne(id: number) {
    return this.reportRepo.findOneBy({ id });
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return this.reportRepo.update(id, updateReportDto);
  }

  remove(id: number) {
    return this.reportRepo.delete(id);
  }

  async resolveReport(reportId: number): Promise<Report> {
    const report = await this.reportRepo.findOne({
      where: { id: reportId },
      relations: ['user'],
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    if (report.resolved === false) {
      report.resolved = true;
      await this.reportRepo.save(report);
      report.user.isBlocked = true;
      await this.userRepo.save(report.user);
    }

    return report;
  }
}
