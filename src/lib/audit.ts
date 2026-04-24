import prisma from './prisma';

export type AuditAction = 
  | 'PROFILE_CREATE' 
  | 'PROFILE_UPDATE' 
  | 'ALERT_CONFIG' 
  | 'GRANT_MATCH' 
  | 'LOGIN_SUCCESS';

export async function recordAuditLog({
  action,
  entity,
  entityId,
  userId,
  details
}: {
  action: AuditAction;
  entity: string;
  entityId?: string;
  userId?: string;
  details?: any;
}) {
  try {
    return await prisma.auditLog.create({
      data: {
        action,
        entity,
        entityId,
        userId,
        details,
      }
    });
  } catch (error) {
    // Falha silenciosa em auditoria não deve quebrar o fluxo principal, 
    // mas em um cenário real logariamos o erro aqui (ex: Sentry)
    console.error('Failed to record audit log:', error);
  }
}
