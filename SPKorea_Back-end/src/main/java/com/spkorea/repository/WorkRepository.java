package com.spkorea.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spkorea.dto.MainThumbnailDto;
import com.spkorea.dto.NewThumbnailDto;
import com.spkorea.entity.Work;

public interface WorkRepository extends JpaRepository<Work, Long> {
	
	@Query(value = """
		    SELECT w.id AS workId, c.name AS categoryName, w.thumbnail_url AS thumbnailUrl
		    FROM (
		        SELECT *, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY created_at ASC) AS rn
		        FROM works
		    ) AS w
		    JOIN categories c ON w.category_id = c.id
		    WHERE w.rn = 1
		""", nativeQuery = true)
		List<MainThumbnailDto> findThumbnailsByCategory();

	@Query(value = """
		    (
		      SELECT w.id, w.title, w.type, w.thumbnail_url
		      FROM works w
		      JOIN categories c ON w.category_id = c.id
		      WHERE c.name = 'IP'
		      ORDER BY w.created_at DESC
		      LIMIT 1
		    )
		    UNION ALL
		    (
		      SELECT w.id, w.title, w.type, w.thumbnail_url
		      FROM works w
		      WHERE w.id NOT IN (
		        SELECT tmp.id FROM (
		          SELECT w_sub.id
		          FROM works w_sub
		          JOIN categories c_sub ON w_sub.category_id = c_sub.id
		          WHERE c_sub.name = 'IP'
		          ORDER BY w_sub.created_at DESC
		          LIMIT 1
		        ) AS tmp
		      )
		      ORDER BY w.created_at DESC
		      LIMIT 5
		    )
		    """, nativeQuery = true)
		List<NewThumbnailDto> findThumbnailsByCategoryDesc();

}
