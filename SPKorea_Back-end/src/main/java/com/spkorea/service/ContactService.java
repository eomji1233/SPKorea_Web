package com.spkorea.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.spkorea.entity.ContactMessage;
import com.spkorea.repository.ContactMessageRepository;

@Service
public class ContactService {

    private final ContactMessageRepository contactRepo;
    private final JavaMailSender mailSender;

    private final String fromEmail;
    private final String toEmail;

    public ContactService(ContactMessageRepository contactRepo,
                          JavaMailSender mailSender,
                          @Value("${spring.mail.username}") String fromEmail,
                          @Value("${contact.mail.to}") String toEmail) {
        this.contactRepo = contactRepo;
        this.mailSender = mailSender;
        this.fromEmail = fromEmail;
        this.toEmail = toEmail;
    }

    public ContactMessage saveMessage(ContactMessage message) {
        ContactMessage saved = contactRepo.save(message);
        sendNotificationEmail(saved);
        return saved;
    }

    private void sendNotificationEmail(ContactMessage message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(fromEmail);
        mail.setTo(toEmail);
        mail.setSubject("새 문의: " + message.getName());
        mail.setText(
            "이름: " + message.getName() + "\n" +
            "이메일: " + message.getEmail() + "\n\n" +
            "내용:\n" + message.getMessage()
        );
        mailSender.send(mail);
    }
}
