import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { sendUserEmail } from '../services/mail.service.js';
import { generateJobEmail } from '../utils/mail-generator.js';
import router from './auth.routes.js';

router.post('/send', authMiddleware, async (req: any, res) => {
  const { to, jobName } = req.body; 
  if (!to || !jobName) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    });

    if (!user || !user.accessToken || !user.refreshToken) {
      return res.status(401).json({ error: 'Credenciais do Google expiradas.' });
    }

  
    const subject = `Candidatura para a vaga de ${jobName} - Bruno Pasqual`;
    const body = generateJobEmail(jobName);

    await sendUserEmail(
      user.accessToken,
      user.refreshToken,
      to,
      subject,
      body
    );

    return res.json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao processar envio:', error);
    return res.status(500).json({ error: 'Erro ao processar envio.' });
  }
});

export default router;