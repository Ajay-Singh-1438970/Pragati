import React, { useEffect, useState } from 'react';

function RecentFiles({ currentUser }) {
  const [recentFiles, setRecentFiles] = useState([]);

  // Fetch recent files when component mounts or currentUser changes
  useEffect(() => {
    if (!currentUser?._id) return;

    const fetchRecentFiles = async () => {
      try {
        const res = await fetch(`/api/recent-files/${currentUser._id}`);
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
      await fetch('/api/recent-files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser._id,
          fileId: file._id,
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
    <div style={{ width: '250px', border: '1px solid #ddd', padding: '10px' }}>
      <h3>Recently Opened</h3>
      {recentFiles.length === 0 && <p>No recent files</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {recentFiles.map(file => (
          <li
            key={file.fileId}
            style={{ marginBottom: '10px', cursor: 'pointer' }}
            onClick={() => handleOpenFile(file)}
          >
            <strong>{file.fileName}</strong><br/>
            <small>{new Date(file.openedAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentFiles;
