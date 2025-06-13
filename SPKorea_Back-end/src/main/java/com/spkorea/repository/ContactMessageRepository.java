package com.spkorea.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spkorea.entity.ContactMessage;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long>{

}
