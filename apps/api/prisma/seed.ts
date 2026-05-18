import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const FREE_EPISODES = [
  { title: 'Tổng quan về Implant Nha khoa', description: 'Khái niệm cơ bản, lợi ích, đối tượng phù hợp.' },
  { title: 'Giải phẫu xương hàm cho Implant', description: 'Cấu trúc xương hàm và các mốc giải phẫu quan trọng.' },
  { title: 'Phân loại Implant phổ biến', description: 'So sánh các hệ Implant: Straumann, Nobel, Osstem...' },
  { title: 'Chỉ định và chống chỉ định', description: 'Tiêu chí lựa chọn bệnh nhân cho cấy ghép Implant.' },
  { title: 'Quy trình thăm khám trước phẫu thuật', description: 'CBCT, đánh giá xương, lập kế hoạch điều trị.' },
  { title: 'Dụng cụ cơ bản trong phẫu thuật Implant', description: 'Bộ dụng cụ, mũi khoan, torque wrench.' },
  { title: 'Vô khuẩn trong phẫu thuật Implant', description: 'Quy trình vô khuẩn chuẩn ISO trong nha khoa.' },
  { title: 'Gây tê tại chỗ trong cấy ghép', description: 'Kỹ thuật gây tê hiệu quả, an toàn cho bệnh nhân.' },
  { title: 'Đường rạch và bóc tách vạt', description: 'Các đường rạch cơ bản và kỹ thuật bóc tách niêm mạc.' },
  { title: 'Khoan định hướng và chuẩn bị xương', description: 'Sequence khoan đúng kỹ thuật, tránh quá nhiệt.' },
];

const LOCKED_EPISODES = [
  { title: 'Đặt Implant tức thì sau nhổ răng', description: 'Kỹ thuật đặt Implant immediate, chỉ định và quy trình.' },
  { title: 'Ghép xương dạng khối (Block grafting)', description: 'Lấy và ghép xương khối tự thân vùng cằm/cành lên.' },
  { title: 'Nâng xoang hở (Lateral Sinus Lift)', description: 'Quy trình nâng xoang qua cửa sổ bên chi tiết.' },
  { title: 'Nâng xoang kín (Crestal approach)', description: 'Kỹ thuật Summers, osteotome cho xoang hàm trên.' },
  { title: 'Phục hình trên Implant: All-on-4 / All-on-6', description: 'Kế hoạch điều trị toàn hàm cho bệnh nhân mất răng.' },
];

async function main() {
  console.log('Resetting database…');
  await prisma.episode.deleteMany();
  await prisma.series.deleteMany();
  await prisma.user.deleteMany();

  console.log('Creating admin user…');
  await prisma.user.create({
    data: {
      email: 'admin@rhmplay.local',
      password: await bcrypt.hash('admin123', 10),
      fullName: 'RHM Play Admin',
      role: UserRole.ADMIN,
    },
  });

  console.log('Creating Implant series…');
  const series = await prisma.series.create({
    data: {
      title: 'Cấy ghép Implant Nha khoa – Từ A đến Z',
      description:
        'Khóa học toàn diện về cấy ghép Implant cho bác sĩ Răng-Hàm-Mặt: từ giải phẫu, chỉ định, kỹ thuật phẫu thuật cơ bản đến nâng cao như ghép xương và nâng xoang.',
      thumbnail: 'https://placehold.co/720x1280/0f172a/ffffff?text=Implant+Series',
    },
  });

  console.log('Creating episodes…');
  const episodes = [
    ...FREE_EPISODES.map((e, i) => ({
      ...e,
      order: i + 1,
      isFree: true,
      videoUrl: `https://cdn.rhmplay.local/series/${series.id}/ep-${i + 1}.m3u8`,
      seriesId: series.id,
    })),
    ...LOCKED_EPISODES.map((e, i) => ({
      ...e,
      order: FREE_EPISODES.length + i + 1,
      isFree: false,
      videoUrl: `https://cdn.rhmplay.local/series/${series.id}/ep-${FREE_EPISODES.length + i + 1}.m3u8`,
      seriesId: series.id,
    })),
  ];

  await prisma.episode.createMany({ data: episodes });

  console.log(`Seed complete: 1 series, ${FREE_EPISODES.length} free + ${LOCKED_EPISODES.length} locked episodes.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
