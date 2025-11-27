const http = require('http');
const PORT = 4003;
const data = {
  users: [{id:1,name:'Ahmad Ali',email:'ahmad@example.com',phone:'0123456789',status:'Aktif'}],
  agencies: [{id:1,code:'JPN',name:'Jabatan Pendaftaran Negara',category:'Pendaftaran',email:'jpn@gov.my',phone:'03-1234567',status:'Pending'}],
  chats: [{id:1,userId:1,agencyId:1,service:'Permohonan MyKad',status:'Aktif',date:'2025-10-05'}],
  stats:{totalUsers:1405,activeUsers:528,newUsersYear:68,totalAgencies:8,activeAgencies:5}
};
function sendJSON(res,obj){res.setHeader('Content-Type','application/json'); res.end(JSON.stringify(obj));}
const server = http.createServer((req,res)=>{
  const url = req.url;
  if(url === '/api/users') return sendJSON(res,data.users);
  if(url.startsWith('/api/users/')) {
    const id = parseInt(url.split('/')[3]);
    const u = data.users.find(x=>x.id===id);
    return sendJSON(res,u||{});
  }
  if(url === '/api/agencies') return sendJSON(res,data.agencies);
  if(url === '/api/chats') return sendJSON(res,data.chats);
  if(url === '/api/stats') return sendJSON(res,data.stats);
  if(url === '/api/login' && req.method === 'POST') {
    let body=''; req.on('data', c=> body+=c); req.on('end', ()=>{
      try{ const b = JSON.parse(body||'{}'); if(b.role) return sendJSON(res,{ok:true,role:b.role,token:'mock-'+b.role}); }catch(e){}
      res.statusCode = 401; sendJSON(res,{ok:false});
    }); return;
  }
  res.statusCode = 404; res.end('Not found');
});
server.listen(PORT, ()=> console.log('Mock API running on http://localhost:'+PORT));
