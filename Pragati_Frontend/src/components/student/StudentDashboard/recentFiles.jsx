import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { BookOpen} from "lucide-react";

function RecentFiles({ currentUser }) {
  const [recentFiles, setRecentFiles] = useState([]);

  // Fetch recent files when component mounts or currentUser changes
  useEffect(() => {
    if (!currentUser?._id) return;

    const fetchRecentFiles = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recentFiles/${currentUser._id}`);
        const data = await res.json();
        setRecentFiles(data);
      } catch (err) {
        console.error("Error fetching recent files:", err);
      }
    };

    fetchRecentFiles();
  }, [currentUser?._id]);

  // Handle opening a file
  const handleOpenFile = async (file) => {
    // Open Google Drive / URL in new tab
    window.open(file.fileUrl, '_blank');

    try {
      // POST request to backend to update recent files
      await fetch('/api/recentFiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser._id,
          fileId: file.fileId,
          fileName: file.title || file.fileName,
          fileUrl: file.fileUrl
        })
      });

      // Update local state instantly
      setRecentFiles(prev => {
        const filtered = prev.filter(f => f.fileId !== file._id);
        return [{ fileId: file._id, fileName: file.title || file.fileName, fileUrl: file.fileUrl, openedAt: new Date() }, ...filtered].slice(0, 5);
      });
    } catch (err) {
      console.error("Error updating recent files:", err);
    }
  };

  return (
    <div>
      {/* <h3>Recently Opened</h3> */}
      {recentFiles.length === 0 && <p>No recent files</p>}
        <ListGroup variant="flush">
        {recentFiles.map(file => (
          <ListGroup.Item
            key={file.fileId}
            style={{ padding: '16px', cursor: 'pointer' }}
            onClick={() => handleOpenFile(file)}
          >
            <BookOpen color="black" size={20} className="text-warning me-2" />
            <strong>{file.fileName}</strong><br/>
            <small>{new Date(file.openedAt).toLocaleString()}</small>
          </ListGroup.Item>
        ))}
        </ListGroup>
    </div>
  );
}

export default RecentFiles;
