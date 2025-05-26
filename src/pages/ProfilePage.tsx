
import React, { useState } from 'react';
import { ArrowLeft, Crown, History, Shield, MessageCircle, Download, Trash2, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [membershipStatus] = useState('free'); // 'free' | 'premium'
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showNFTDialog, setShowNFTDialog] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<any>(null);

  // Mock data for generation history
  const [generationHistory, setGenerationHistory] = useState([
    {
      id: 1,
      style: 'Q版漫画',
      date: '2024-01-20 14:30',
      thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      style: '简约线条',
      date: '2024-01-19 16:15',
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      style: '怀旧像素',
      date: '2024-01-18 09:45',
      thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop&crop=face'
    }
  ]);

  // Mock data for NFT collection
  const nftCollection = [
    {
      id: 1,
      name: '立春·梅花',
      series: '24节气系列',
      rarity: '稀有',
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: '雨水·桃花',
      series: '24节气系列',
      rarity: '传说',
      thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const handleDownloadHistory = (item: any) => {
    toast({
      title: "下载开始",
      description: `正在下载${item.style}风格的头像`,
    });
    // Simulate download
    console.log('Downloading:', item);
  };

  const handleDeleteHistory = (id: number) => {
    setGenerationHistory(prev => prev.filter(item => item.id !== id));
    toast({
      title: "删除成功",
      description: "生成历史已删除",
    });
  };

  const handleUpgradeClick = () => {
    setShowUpgradeDialog(true);
  };

  const handleNFTView = (nft: any) => {
    setSelectedNFT(nft);
    setShowNFTDialog(true);
  };

  const handleContactSupport = () => {
    toast({
      title: "联系客服",
      description: "客服将通过微信与您联系，请保持手机畅通",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回
        </Button>
        <h2 className="font-semibold">我的</h2>
        <div></div>
      </div>

      <div className="pb-20">
        <Tabs defaultValue="profile" className="max-w-md mx-auto h-full flex flex-col">
          <TabsContent value="profile" className="flex-1 space-y-6 p-4">
            {/* Membership Status */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      {membershipStatus === 'premium' ? (
                        <Crown className="w-6 h-6 text-yellow-600" />
                      ) : (
                        <Shield className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {membershipStatus === 'premium' ? '尊贵会员' : '普通用户'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {membershipStatus === 'premium' 
                          ? '享受无限生成特权' 
                          : '每日可免费生成3次'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {membershipStatus === 'free' && (
                      <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500" onClick={handleUpgradeClick}>
                        升级会员
                      </Button>
                    )}
                    {membershipStatus === 'premium' && (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        至 2024-12-31
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">使用统计</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">今日已生成</span>
                  <span className="font-medium">2/3 次</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">累计生成</span>
                  <span className="font-medium">47 张</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">收藏NFT</span>
                  <span className="font-medium">{nftCollection.length} 个</span>
                </div>
              </CardContent>
            </Card>

            {/* Generation History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <History className="w-5 h-5 mr-2" />
                  生成历史
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {generationHistory.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-center space-x-3">
                      <img 
                        src={item.thumbnail} 
                        alt={item.style}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.style}</h4>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleDownloadHistory(item)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleDeleteHistory(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {index < generationHistory.length - 1 && <Separator className="mt-3" />}
                  </div>
                ))}
                
                {generationHistory.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>暂无生成历史</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => navigate('/')}
                    >
                      立即生成
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* NFT Collection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-yellow-600" />
                  数字藏品保险箱
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nftCollection.map((nft, index) => (
                  <div key={nft.id}>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img 
                          src={nft.thumbnail} 
                          alt={nft.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="absolute -top-1 -right-1">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs px-1 ${
                              nft.rarity === '传说' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {nft.rarity}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{nft.name}</h4>
                        <p className="text-xs text-gray-500">{nft.series}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleNFTView(nft)}>
                        查看
                      </Button>
                    </div>
                    {index < nftCollection.length - 1 && <Separator className="mt-3" />}
                  </div>
                ))}

                {nftCollection.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Crown className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>暂无数字藏品</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => console.log('Shop NFT')}
                    >
                      前往商城
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Customer Service */}
            <Card>
              <CardContent className="p-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleContactSupport}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  联系客服
                </Button>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center text-xs text-gray-400 pb-4">
              <p>AI二次元头像工坊 v1.0.0</p>
              <p className="mt-1">智能生成，创意无限</p>
            </div>
          </TabsContent>

          <TabsContent value="generate" className="flex-1 p-4">
            <div className="text-center py-8">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h2 className="text-xl font-semibold mb-2">开始生成</h2>
              <p className="text-gray-600 mb-6">上传照片，选择风格，生成专属头像</p>
              <Button 
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                立即开始生成
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Fixed Bottom Tab Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <Tabs defaultValue="profile" className="max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-transparent rounded-none h-16">
            <TabsTrigger value="generate" className="flex flex-col items-center space-y-1 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs">生成</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col items-center space-y-1 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600">
              <User className="w-5 h-5" />
              <span className="text-xs">我的</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Upgrade Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              <Crown className="w-6 h-6 mr-2 text-yellow-500" />
              升级会员
            </DialogTitle>
            <DialogDescription className="text-center">
              解锁所有付费风格和无限生成特权
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">会员特权</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• 解锁所有付费风格</li>
                <li>• 无限次数生成</li>
                <li>• 优先处理队列</li>
                <li>• 高清无水印下载</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">¥19.9</div>
              <div className="text-sm text-gray-500">月度会员</div>
            </div>
          </div>

          <DialogFooter className="flex flex-col space-y-2">
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => {
                setShowUpgradeDialog(false);
                toast({
                  title: "支付处理中",
                  description: "正在跳转到支付页面...",
                });
              }}
            >
              立即开通会员
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowUpgradeDialog(false)}
            >
              稍后再说
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* NFT View Dialog */}
      <Dialog open={showNFTDialog} onOpenChange={setShowNFTDialog}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              <Crown className="w-6 h-6 mr-2 text-yellow-500" />
              数字藏品详情
            </DialogTitle>
          </DialogHeader>
          
          {selectedNFT && (
            <div className="space-y-4 py-4">
              <div className="text-center">
                <img 
                  src={selectedNFT.thumbnail} 
                  alt={selectedNFT.name}
                  className="w-32 h-32 mx-auto rounded-lg object-cover mb-4"
                />
                <h3 className="text-lg font-semibold">{selectedNFT.name}</h3>
                <p className="text-sm text-gray-600">{selectedNFT.series}</p>
                <Badge className={`mt-2 ${
                  selectedNFT.rarity === '传说' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {selectedNFT.rarity}
                </Badge>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col space-y-2">
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => {
                setShowNFTDialog(false);
                toast({
                  title: "下载成功",
                  description: "高清无水印版本已保存到相册",
                });
              }}
            >
              下载高清版
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowNFTDialog(false)}
            >
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
